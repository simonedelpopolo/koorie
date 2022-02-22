import input from '../input.js'
import { address_flag_get, cluster_flag_get, domain_flag_get, init_command_get, logger_flag_get, process_exit__, response_time_flag_get, shell_exit_codes__ } from '../exporter.js'
import { number_, undefined_ } from 'oftypes'

export const process_titleSymbol = Symbol( 'switch for process.title' )
export const process_title = Object.defineProperty( input, process_titleSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    value: async function* selector ( process_parsed_argv ){
        
        let error = false
        let no_process = false
        let returns
        
        switch( process.title ){
            
            case 'koorie':
    
                for ( const flag in process_parsed_argv.keys ) {
    
                    switch ( process_parsed_argv.keys[ flag ] ) {
        
                        case 'a':
                        case 'address':
            
                            process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await address_flag_get(
                                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                            )
                                .catch( async error => {
                                    await process_exit__( '--address accept only string.', error, shell_exit_codes__.flags )
                                } )
            
                            continue
        
                        case 'c':
                        case 'cluster':
            
                            process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await cluster_flag_get(
                                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                            )
                                .catch( async error => {
                                    await process_exit__( '--cluster accept only numbers or string "full".', error, shell_exit_codes__.flags )
                                } )
            
                            continue
        
                        case 'd':
                        case 'domain':
            
                            process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await domain_flag_get(
                                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                            )
                                .catch( async error => {
                                    await process_exit__( '--domain accept only string.', error, shell_exit_codes__.flags )
                                } )
            
                            continue
                            
                        case 'hot':
    
                            process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = true
                            
                            continue
        
                        case 'l':
                        case 'logger': {
            
                            const logger = await logger_flag_get( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] )
                                .catch( error => process_exit__( error, Error( `${ process.title } flags-error` ), shell_exit_codes__.flags ) )
                            process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = logger.logger
            
                            
                        }
                            continue
                            
                        case 'ml':
                        case 'middleware':
            
                            continue
        
                        case 'p':
                        case 'port':
            
                            if( await undefined_( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] ) === false ) {
                
                                if ( await number_( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] ) === false )
                                    await process_exit__( '--port accept only numbers.', Error( `${ process.title } flags-error` ), shell_exit_codes__.flags )
                
                                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = parseInt( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] )
                
                            } else
                                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = '0'
            
                            continue
                            
                        case 'rt':
                        case 'response_time': {
                            
                            process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await response_time_flag_get( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] )
                                .catch( async error => process_exit__( '--response-time accept only true|false.', error, shell_exit_codes__.flags ) )
                        }
                            
                            continue
        
                        case 's':
                        case 'static_files':
            
                            continue
        
                        case 'pr':
                        case 'protocol':
            
                            continue
        
                        case 'r':
                        case 'react': {
            
                            const resolvers = {
                                true: ( () => { return 'true' } ),
                                false: ( () => { return process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] } ),
                            }
                            process_parsed_argv.object[ process_parsed_argv.keys [ flag ] ] = ( await undefined_(
                                process_parsed_argv.object[ process_parsed_argv.keys [ flag ] ], resolvers )
                            )()
                            
                            console.log( process_parsed_argv.object[ process_parsed_argv.keys [ flag ] ] )
            
                        }
                            continue
                        case 'false_flag':
            
                            break
        
                        default: {
            
                            let error = `\x1b[41m        flag \`${ process_parsed_argv.keys[ flag ] }\` not recognize\x1b[0m\n`
                            error += `\x1b[41m        run -> ${ process.title } help[h]        \x1b[0m\n`
                            await process_exit__( error, new TypeError( `${ process.title } flags-error` ), shell_exit_codes__.flags )
                        }
                    }
                    
                }
                
                returns = process_parsed_argv.object
                
                break
            case 'koorie-shell': {
    
                const shell_options = {
                    command: false,
                    middleware: false,
                    version: false,
                    name: false,
                    description: false,
                    author: false,
                    license: false,
                }
    
                /**
                 * - command selector, flags & options initializer.
                 *
                 * @type {{
                 *  command: {
                 *      init: {
                 *          license: boolean|string,
                 *          author: boolean|string,
                 *          name: boolean|string,
                 *          description: boolean|string,
                 *          version: boolean|string,
                 *          middleware: boolean|string
                 *      },
                 *      route: {
                 *          add: boolean|string,
                 *          edit: boolean|string,
                 *          delete: boolean|string
                 *      }
                 *  }
                 *}}
                 */
                const shell = {
                    command: {
                        init: {
                            middleware: false,
                            version: false,
                            name: false,
                            description: false,
                            author: false,
                            license: false,
                        },
                        route: {
                            add: false,
                            delete: false,
                            edit: false
                        }
                    }
                }
    
                console.trace( process_parsed_argv )
                
                process.exit()
                for ( const flag in process_parsed_argv.keys ) {
                    switch ( process_parsed_argv.keys[ flag ] ) {
            
                        case 'init': {
                
                            shell_options.command = 'init'
                            
                            await init_command_get( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] )
                                .catch( error => process_exit__( error.message, Error( `${ process.title } commands-error` ), shell_exit_codes__.commands ) )
                
                            delete process_parsed_argv.object.init
                            process_parsed_argv.keys.splice( 0, 1 )
                
                            const initFlags = Object.keys( process_parsed_argv.object )
                
                            for ( const flag in initFlags ) {
                    
                                switch ( initFlags[ flag ] ) {
                        
                                    case 'm':
                                    case 'middleware':
                            
                                        shell_options.middleware = process_parsed_argv.object[ initFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ initFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                            
                                        continue
                        
                                    case 'v':
                                    case 'version':
                            
                                        shell_options.version = process_parsed_argv.object[ initFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ initFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                            
                                        continue
                        
                                    case 'n':
                                    case 'name':
                            
                                        shell_options.name = process_parsed_argv.object[ initFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ initFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                            
                                        continue
                        
                                    case 'd':
                                    case 'description':
                            
                                        shell_options.description = process_parsed_argv.object[ initFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ initFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                            
                                        continue
                        
                                    case 'l':
                                    case 'license':
                            
                                        shell_options.license = process_parsed_argv.object[ initFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ initFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                            
                                        continue
                        
                                    case 'a':
                                    case 'author':
                            
                                        shell_options.author = process_parsed_argv.object[ initFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ initFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                            
                                        break
                        
                                    default: {
                                        let error = `\x1b[41m        flag \`${ initFlags[ flag ] }\` not recognize\x1b[0m\n`
                                        error += `\x1b[41m        run -> ${ process.title } init help[h]        \x1b[0m\n`
                                        await process_exit__( error, new TypeError( `${ process.title } flags-error` ), shell_exit_codes__.flags )
                                    }
                                }
                            }
                            
                            returns = shell_options
                
                        }
                            break
                        default: {
                
                            let error = `\x1b[41m        command \`${ process_parsed_argv.keys[ flag ] }\` not recognize\x1b[0m\n`
                            error += `\x1b[41m        run -> ${ process.title } help[h]        \x1b[0m\n`
                            await process_exit__( error, new TypeError( `${ process.title } commands-error` ), shell_exit_codes__.commands )
                        }
            
                    }
                }
            }
                
                break
            
            default:
                no_process = true
                break
        }
        
        yield new Promise( ( resolve, reject ) => {
            
            if( no_process ) {
                let error = `\x1b[41m        process.title -> \`${ process.title }\` not recognize\x1b[0m\n`
                process_exit__( error, new ReferenceError( 'internal-error' ), shell_exit_codes__.internal ).catch( error => {throw error} )
            }
            
            if( error )
                reject( error )
            
            resolve( returns )
            
        } )
        
    },
} )
