import cluster from 'node:cluster'
import { constants } from 'fs'
import koorie from '../koorie.js'
import { koorie_log_writer } from './server/functions/logger.js'
import { listen_text } from './initialize/text/listen.js'
import { true_false } from 'boolean-jokes'
import { access, rm } from 'node:fs/promises'
import { array_, oftype_ } from 'oftypes'
import { cluster_system_check, process_exit, shell_exit_codes } from '../../index.js'

const forkSymbol = Symbol( 'Object [ koorie.fork ]' )
const fork = Object.defineProperty( koorie, forkSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.fork ]
     * Handles the cluster and forks.
     *
     * @param {number|string|boolean} cpus - Parsed arguments. If is set 0 it will use all the available CPUs.
     * @param {{path:string, flag:string}} static_files - Static files absolute path (directory `public`).
     * @param {string} ejected - file to bootstrap koorie ejected state.
     * @returns {Promise<void> | void}
     */
    value: async function fork( cpus, static_files, ejected ){

        process.env.FALSE_FLAG = 'true'
        if( await oftype_( ejected ) !== 'undefined' )
            process.env.EJECTED_FILE = ejected

        let forks_for_cpus
        let executable_like_file

        /**
         * - ./lib/koorie/fork/cluster_system_check
         * explanatory comments there.
         *
         * @type {AsyncGenerator}
         */
        const cluster_system_checking = await cluster_system_check( cpus )

        /**
         * - first check
         * - second check
         * - third check
         * - forth check
         * ./lib/koorie/fork/cluster_system_check
         * explanatory comments there.
         *
         * @type {number|PromiseRejectionEvent}
         */
        forks_for_cpus = await cluster_system_checking.next()
            .then( resolve => resolve.value )

        /**
         * - last check is for the file that will execute to start up the server
         * ./lib/koorie/fork/cluster_system_check
         * explanatory comments there.
         */
        const executable_like_file_system_check = await cluster_system_checking.next( )
            .then( resolved => resolved.value )
            .catch( async error => process_exit(
                error.message.bg_red().color( 255 ),
                new ReferenceError( `${process.title} Object [koorie.cluster] initialize file not ${error.cluster} -> ${error.initialize_file}` ),
                shell_exit_codes.flags
            ) )

        // - set async function generator to done.
        executable_like_file = await cluster_system_checking.return( executable_like_file_system_check )
            .then( fork => fork.value )

        if ( cluster.isPrimary ) {

            cluster.setupPrimary( {
                args: process.argv,
                exec: executable_like_file,
                stdio: [ 'inherit', 'inherit', 'inherit', 'ipc' ]
            } )

            console.log( '----------------------------------------------------'.green() )
            console.log( `${process.title} @ pid->${process.pid} up and rocking`.bg_yellow().green().underline().strong() )

            if( await true_false( process.env.SOCKET_ACTIVE ) ) {

                // Checks if the socket file already exists if exists will be deleted.
                const socket_file = await access( process.env.SOCKET_PATH, constants.F_OK ).catch( error => error )
                if( ! ( socket_file instanceof Error ) ) {
                    await rm( process.env.SOCKET_PATH ).catch( async error => {
                        await process_exit(
                            '[ koorie.fork] error-deletion',
                            new ReferenceError( error.message ),
                            shell_exit_codes.internal
                        )
                    } )
                }

                console.log()
                console.log( `⌖ socket active at -> ${ process.env.SOCKET_PATH }⌖ `.color( 63 ).bg_color( 253 ).strong() )
                console.log()
            }

            // - one time server.listen() message
            console.log( listen_text() )
            console.log( '----------------------------------------------------'.green() )

            // Fork workers.
            for ( let i = 0; i < forks_for_cpus; i++ ) {
                cluster.fork( {
                    STATIC_FILES: process.env.STATIC_FILES,
                    EXPERIMENTAL_LOG_WRITER_PID: process.env.EXPEXPERIMENTAL_LOG_WRITER_PID,
                    FORKED: process.env.FORKED,
                } )
            }


            // - todo management on resurrection ENVIRONMENT_VARIABLE
            cluster.on( 'exit', ( worker, code, signal ) => {

                console.error( `worker ID -> ${worker.id} died with code [${code}] received signal ${signal}` )

                const HOT = resurrection.options.HOT || process.env.HOT

                const merge = {
                    STATIC_FILES: process.env.STATIC_FILES,
                    EXPERIMENTAL_LOG_WRITER_PID: process.env.EXPEXPERIMENTAL_LOG_WRITER_PID,
                    FORKED: process.env.FORKED,
                    HOT: HOT
                }

                cluster.fork( merge )

            } )

            // - emptying process.argv this will ensure that the killed and resurrected processes wil not have the same argv
            cluster.on( 'fork', () => process.argv.splice( 0, process.argv.length + 1 ) )

            // - for every worker attach event on('message')
            for ( const id in cluster.workers ) {
                cluster.workers[ id ].on( 'message', () => {} )
                cluster.workers[ id ].on( 'error', error => console.trace( error ) )
            }

            // - cluster.isPrimary event on('message')
            let resurrection = {
                options: {
                    HOT: null
                }
            }
            // - todo messages
            cluster.on( 'message', async ( worker, options ) => {

                // - the worker message sent to primary koorie process that will process the data @ koorie_log_writer
                if( await array_( options ) )
                    koorie_log_writer.send( options[ 0 ] )

                else{
                    // - todo workers resurrection ENVIRONMENT_VARIABLE
                    // - todo reorganization of the socket APIs
                    // - todo all the cluster.isPrimary.event.message moved into another Object.
                    // - todo all the cluster.isWorker.event.message moved into another Object.
                    resurrection.options.HOT = options.HOT

                    let work = 'cluster worker'.green()
                    work += ' ➠ '.red()
                    work += `id = [${worker.id.toString().cyan()}]`
                    work += ' received new set of options'.green()

                    worker.send( `${work}` )
                    worker.send( '\nthe options will be applied to all the workers ⬇︎ \n'.magenta() )
                    worker.send( `${JSON.stringify( options )}\n`.green() )

                    for ( const worker of Object.values( cluster.workers ) )
                        process.nextTick( () => worker.destroy() )
                }


            } )
        }
    }
} )

export default fork[ forkSymbol ]
