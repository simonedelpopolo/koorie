import { access } from 'node:fs/promises'
import { constants } from 'node:fs'
import os from 'node:os'
import { boolean_, number_ } from 'oftypes'

/**
 * System check while forking the processes.
 * NUMBER of CPUs must be greater or equal to the given argument to the flag --cluster.
 *
 * @param {number|string|boolean} check - given flag.
 * @yields
 * @returns {AsyncGenerator<*>}
 */
export default async function* cluster_system_check( check ){

    // - first check the system has only 1 CPU available
    // - second check the given flag to be oftype boolean
    // - third if the given flag is === 'full'
    // - fourth if the given flag value is greater than of the available CPUs
    yield await ( async () => {
        // - if system has only one CPU return 1 and fork single process
        if( os.cpus().length === 1 ) return 1

        // --cluster without argument fork for half of the available CPUs
        if( await boolean_( check ) ) return os.cpus().length / 2

        // --cluster=full fork for all the available CPUs
        if( check === 'full' ) return os.cpus().length

        // --cluster={number} check if greater than the available CPUs
        if( await number_( check ) ){

            // - rejects
            if( check > os.cpus().length )

                return Promise.reject( new ReferenceError( `${ process.title } cpus-exceed [Object -> koorie.fork.cluster_system_check]` ) )

        }

        // - resolve with the --cluster={number} value and fork the number of processes requested.
        return Promise.resolve( check )
    } )()

    // - last check the existence of the ejected file or the default executable file ./koorie.js

    yield await ( async () => {

        // - **ejected state** doesn't require the file that will run to have executable permissions on the host OS.
        // - if, for any reasons, the default file ./koorie.js hasn't executable permission, it will exit the bootstrap of the server.
        const X_OK = process.env.EJECTED === 'false' ? constants.F_OK | constants.X_OK : constants.F_OK

        let koorie_process
        if ( await import.meta.resolve( 'koorie' ).catch( error => error ) instanceof Error )
            koorie_process = './koorie.js'
        else koorie_process = 'node_modules/koorie/koorie.js'

        // - **ejected state** registers the file name in a ENVIRONMENT_VARIABLE otherwise the default is ./koorie.js
        const executable_like_file = `${process.cwd()}/${process.env.EJECTED_FILE || koorie_process}`

        await access( executable_like_file, X_OK )
            .catch( error => {
                if( error.code === 'EACCES' ) {
                    error.cluster = 'executable'
                    error.initialize_file = executable_like_file
                }

                else if ( error.code === 'ENOENT' ) {
                    error.cluster = 'found'
                    error.initialize_file = executable_like_file
                }

                return Promise.reject( error )
            } )

        return Promise.resolve( executable_like_file )
    } )()
}
