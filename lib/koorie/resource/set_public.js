import { access } from 'fs/promises'
import { Blaze } from '@cli-blaze/decors'
import { constants } from 'fs'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { map } from 'boolean-jokes'
import { default as public__ } from './public.js'
import readline from 'readline'
import { default as resource_event_static_files } from '../resource/event/static_files.js'
import { string_ } from 'oftypes'

/**
 * Object [ koorie.resource.set_public]
 * returns the path of the public file from requests.
 *
 * @param {string} path - register the resource public from the request.
 * @returns {Promise<void> | void}
 */
export default async function resource_set_public( path  ) {

    if( typeof process.env.STATIC_FILES !== 'undefined' && process.env.STATIC_FILES.length === 0 )
        resource_event_static_files.emit( 'set', await finalize( '' ) )

    else if ( typeof process.env.STATIC_FILES !== 'undefined' )
        resource_event_static_files.emit( 'set', await finalize( process.env.STATIC_FILES ) )

    else{

        if( await string_( path ) !== true ) {
            await exit(
                `resource.set_public(path) argument must be oftypes<string>. Given type: ${ typeof path }`,
                new TypeError( '[koorie.resource.set_public()]' ), error_code.TYPE )
        }

        if ( path.length === 0 ) {
            const rl = readline.createInterface( {
                input: process.stdin,
                output: process.stdout
            } )

            rl.question( Blaze.red( 'public path is set to the root directory. is this fine? [yes|no]\n' ), async ( answer ) => {
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
                        await exit(
                            Blaze.underline( Blaze.strong( Blaze.bg_red( Blaze.color( 255, 'only [yes|y] OR [no|n] are accepted answer' ) ) ) ),
                            new ReferenceError( `[koorie.resource.set_public() - boolean-jokes.map()]\n${Blaze.underline( Blaze.strong( Blaze.bg_magenta( Blaze.color( 255, path_length ) ) ) )}` ),
                            error_code.FLAG
                        )
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
            await exit( error.message, new ReferenceError( '[koorie.resource.set_public()]' ), error_code.FLAG )

        public__.push( path )

        return true
    }
}
