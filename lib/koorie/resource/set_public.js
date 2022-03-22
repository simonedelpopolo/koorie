import { access } from 'fs/promises'
import { constants } from 'fs'
import { map } from 'boolean-jokes'
import { default as public__ } from './public.js'
import readline from 'readline'
import resource from '../resource.js'
import { default as resource_event_static_files } from '../resource/event/static_files.js'
import { string_ } from 'oftypes'
import { process_exit, shell_exit_codes } from '../../../index.js'

const set_publicSymbol = Symbol( 'Object [ koorie.resource.set_public ]' )
const set_public = Object.defineProperty( resource, set_publicSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.set_public]
     * returns the path of the public file from requests.
     *
     * @param {string} path - register the resource public from the request.
     * @returns {Promise<void> | void}
     */
    value: async function resource_set_public( path  ) {

        if( typeof process.env.STATIC_FILES !== 'undefined' && process.env.STATIC_FILES.length === 0 )
            resource_event_static_files.emit( 'set', await finalize( '' ) )

        else if ( typeof process.env.STATIC_FILES !== 'undefined' )
            resource_event_static_files.emit( 'set', await finalize( process.env.STATIC_FILES ) )

        else{

            if( await string_( path ) !== true ) {
                await process_exit(
                    `resource.set_public(path) argument must be oftypes<string>. Given type: ${ typeof path }`,
                    new TypeError( '[koorie.resource.set_public()]' ), shell_exit_codes.type_checking )
            }

            if ( path.length === 0 ) {
                const rl = readline.createInterface( {
                    input: process.stdin,
                    output: process.stdout
                } )

                rl.question( 'public path is set to the root directory. is this fine? [yes|no]\n'.red(), async ( answer ) => {
                    const path_length = await map( { yes: true, y:true, no: false, n: false }, answer ).catch( error => error )
                    switch ( path_length ){
                        case false:
                            readline.moveCursor( process.stdout, 0, -1 )
                            rl.question( 'first and last "/" must be skipped form the path ❗ example ( public/distro ) ⬇ \n', async answer => {
                                readline.moveCursor( process.stdout, 0, -1 )
                                resource_event_static_files.emit( 'set', await finalize( answer ) )
                                rl.close()
                            } )

                            break
                        case true:
                            readline.moveCursor( process.stdout, 0, -1 )
                            console.warn( '\x1b[41m proceeding with public path set to the root directory.\x1b[0m' )
                            rl.close()
                            resource_event_static_files.emit( 'set', await finalize( '' ) )
                            break
                        default:
                            break
                    }
                } )
            }else
                resource_event_static_files.emit( 'set', await finalize( path ) )
        }

        /**
         * Finalize the set-up of the public directory.
         *
         * @param {string=} path - path to be checked if exists and pushed @ Object [ koorie.resource.public ]
         * @returns {Promise<boolean>|boolean}
         */
        async function finalize( path = '' ){

            const error = await access( `${process.cwd()}/${path}`, constants.F_OK | constants.R_OK | constants.W_OK ).catch( error => error )
            if( error instanceof Error )
                await process_exit( error.message, new ReferenceError( '[koorie.resource.set_public()]' ), shell_exit_codes.flags )

            public__.push( path )

            return true
        }
    }
} )

export default set_public[ set_publicSymbol ]
