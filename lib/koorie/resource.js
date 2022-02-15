import { access } from 'fs/promises'
import { constants } from 'fs'
import { EventEmitter } from 'events'
import koorie from '../koorie.js'
import { map } from 'boolean-jokes'
import { process_exit } from '../../index.js'
import readline from 'readline'
import { string_, undefined_ } from 'oftypes'

export const set_publicEvent = new EventEmitter()
export const resourceSymbol = Symbol( 'server public directory, servername, url parser, options' )
export const resource = Object.defineProperty( koorie, resourceSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: {
        path: '',
        public: '',
        images: [
            '.png',
            '.webp',
            '.jpeg',
            '.ico',
            '.bmp',
            '.svg',
        ],
        text: [
            '.css',
            '.htm',
            '.html',
            '.mjs',
            '.js',
        ],
        application:[
            '.json',
        ],
        set_public: async ( path = '' ) => {
            
            if( await string_( path ) !== true )
                await process_exit( `resource.set_public(path) argument must be oftypes<string>. Given type: ${typeof path}`, Error( 'Koorie-PublicDirectoryError' ), 5 )
            
            await internal_.path_length( path )
        },
        get_public: async () => {
            return internal_.public
        },
        get_path: async () => {
            return internal_.path
        },
        path_length: async ( path ) => {
            
            if ( path.length === 0 ) {
                const rl = readline.createInterface( {
                    input: process.stdin,
                    output: process.stdout
                } )
            
                rl.question( '\x1b[41m public path is set to the root directory. is this fine? [yes|no]\x1b[0m\n', async ( answer ) => {
                    const path_length = await map( { yes: true, y:true, no: false, n: false }, answer ).catch( error => error )
                    switch ( path_length ){
                        case false:
                            readline.moveCursor( process.stdout, 0, -1 )
                            rl.question( 'first and last "/" must be skipped form the path ❗ ( public/distro) ⬇ \n', async answer => {
                                readline.moveCursor( process.stdout, 0, -1 )
                                set_publicEvent.emit( 'set', await internal_.finally( answer ) )
                                rl.close()
                            } )
                        
                            break
                        case true:
                            readline.moveCursor( process.stdout, 0, -1 )
                            console.warn( '\x1b[41m proceeding with public path set to the root directory.\x1b[0m' )
                            rl.close()
                            set_publicEvent.emit( 'set', await internal_.finally() )
                            break
                        default:
                            break
                    }
                } )
            }else
                path === 'ForkEmptyPathY' ? set_publicEvent.emit( 'set', await internal_.finally( '' ) ) : set_publicEvent.emit( 'set', await internal_.finally( path ) )
        },
        finally: async ( path = '' ) => {
            internal_.path = path
            const public_path = `${process.cwd()}/${path}`
            const okAccess = await access( public_path, constants.F_OK | constants.R_OK | constants.W_OK ).catch( error => error.message )
            if( await undefined_( okAccess ) === false )
                await process_exit( okAccess, Error( 'Koorie-PublicDirectoryError' ), 5 )
    
            internal_.public = public_path
    
            return true
        },
        push_image_ext: async ( ext ) => {
            internal_.images.push( `.${ext}` )
        },
        push_text_ext: async ( ext ) => {
            internal_.text.push( `.${ext}` )
        },
        push_application_ext: async ( ext ) => {
            internal_.application.push( `.${ext}` )
        }
    }
} )

const internal_ = resource[ resourceSymbol ]
