import input from '../input.js'

import {
    address_flag_get,
    cluster_flag_get,
    hot_flag_get,
    init_command_get,
    library_flag_get,
    logger_flag_get,
    response_time_flag_get,
    socket_flag_get,
} from '../exporter.js'
import { number_, undefined_ } from 'oftypes'
import { process_exit, shell_exit_codes } from '../../index.js'

export const process_titleSymbol = Symbol( 'Object [ input.process_title ] switch commands, flags by the process.title' )
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
                                    await process_exit( '--address accept only string.', error, shell_exit_codes.flags )
                                } )
            
                            continue
        
                        case 'c':
                        case 'cluster':
            
                            process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await cluster_flag_get(
                                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                            )
                                .catch( async error => {
                                    await process_exit( '--cluster accept only numbers or string "full".', error, shell_exit_codes.flags )
                                } )
            
                            continue
                            
                        case 'hot':
    
                            process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await hot_flag_get(
                                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                            )
                                .catch( async error => {
                                    await process_exit( '--hot accept only the string "false"|"true" or void.', error, shell_exit_codes.flags )
                                } )
                            
                            continue
                            
                        case 'lb':
                        case 'library':
    
                            process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await library_flag_get(
                                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                            )
                                .catch( async error => {
                                    let message = ' --library accept only string.\n'
                                    const library_flag = '--library[-lb]='.green().underline()
                                    message += `    @ koorie [...] ${library_flag} -> ${process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ].toString().red().strong().underline()} \n`
                                    message += '                                      ^'.red()
                                    await process_exit( message, error, shell_exit_codes.flags )
                                } )
                            
                            continue
        
                        case 'l':
                        case 'logger': {
            
                            const logger = await logger_flag_get( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] )
                                .catch( error => process_exit( error.message, Error( `${ process.title } flags-error` ), shell_exit_codes.flags ) )
                            process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = logger.logger
            
                            
                        }
                            continue
                            
                        case 'm':
                        case 'middleware':
            
                            continue
        
                        case 'p':
                        case 'port':
            
                            if( await undefined_( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] ) === false ) {
                
                                if ( await number_( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] ) === false )
                                    await process_exit( '--port accept only numbers.', Error( `${ process.title } flags-error` ), shell_exit_codes.flags )
                
                                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = parseInt( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] )
                
                            } else
                                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = '0'
            
                            continue
                            
                        case 'r':
                        case 'response_time': {
                            
                            process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await response_time_flag_get( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] )
                                .catch( async error => process_exit( '--response-time accept only true|false.', error, shell_exit_codes.flags ) )
                        }
                            continue
    
                        case 'sk':
                        case 'socket': {
    
                            const socket = await socket_flag_get( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] )
                                .catch( error => process_exit( error.message, Error( `${ process.title } flags-error` ), shell_exit_codes.flags ) )
                            process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = socket.socket
                            
                        }
                            continue
        
                        case 's':
                        case 'static_files':
            
                            continue
        
                        case 'pr':
                        case 'protocol':
            
                            continue
                            
                        case 'false_flag':
            
                            break
        
                        default: {
            
                            let error = `\x1b[41m        flag \`${ process_parsed_argv.keys[ flag ] }\` not recognize\x1b[0m\n`
                            error += `\x1b[41m        run -> ${ process.title } help[h]        \x1b[0m\n`
                            await process_exit( error, new TypeError( `${ process.title } flags-error` ), shell_exit_codes.flags )
                        }
                    }
                    
                }
                
                returns = process_parsed_argv.object
                
                break
            case 'koorie-shell': {
    
                /**
                 * - todo koorie and koorie-shell flags and options
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
                 *      },
                 *      set: {
                 *          hot:boolean|string,
                 *          socket_path: boolean|string
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
                        },
                        set: {
                            hot: false,
                            socket_path: false
                        }
                    }
                }
                
                for ( const flag in process_parsed_argv.keys ) {
                    switch ( process_parsed_argv.keys[ flag ] ) {
            
                        case 'init': {
                            
                            delete shell.command.route
                            delete shell.command.set
                            
                            await init_command_get( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] )
                                .catch( error => process_exit( error.message, Error( `${ process.title } commands-error` ), shell_exit_codes.commands ) )
                
                            delete process_parsed_argv.object.init
                            process_parsed_argv.keys.splice( 0, 1 )
                
                            const initFlags = Object.keys( process_parsed_argv.object )
                
                            for ( const flag in initFlags ) {
                    
                                switch ( initFlags[ flag ] ) {
                        
                                    case 'm':
                                    case 'middleware':
                            
                                        shell.command.init.middleware = process_parsed_argv.object[ initFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ initFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                            
                                        continue
                        
                                    case 'v':
                                    case 'version':
    
                                        shell.command.init.version = process_parsed_argv.object[ initFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ initFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                            
                                        continue
                        
                                    case 'n':
                                    case 'name':
    
                                        shell.command.init.name = process_parsed_argv.object[ initFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ initFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                            
                                        continue
                        
                                    case 'd':
                                    case 'description':
    
                                        shell.command.init.description = process_parsed_argv.object[ initFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ initFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                            
                                        continue
                        
                                    case 'l':
                                    case 'license':
    
                                        shell.command.init.license = process_parsed_argv.object[ initFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ initFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                            
                                        continue
                        
                                    case 'a':
                                    case 'author':
    
                                        shell.command.init.author = process_parsed_argv.object[ initFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ initFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                            
                                        break
                        
                                    default: {
                                        let error = `\x1b[41m        flag \`${ initFlags[ flag ] }\` not recognize\x1b[0m\n`
                                        error += `\x1b[41m        run -> ${ process.title } init help[h]        \x1b[0m\n`
                                        await process_exit( error, new TypeError( `${ process.title } flags-error` ), shell_exit_codes.flags )
                                    }
                                }
                            }
                            
                            returns = shell
                
                        }
                            break
                        
                        case 'set': {
    
                            delete process_parsed_argv.object.set
                            process_parsed_argv.keys.splice( 0, 1 )
                            delete shell.command.route
                            delete shell.command.init
                            
                            const setFlags = Object.keys( process_parsed_argv.object )
                            if( setFlags.length === 0 )
                                await process_exit( 'no flags? no party', new ReferenceError( `${ process.title } flags-error` ), shell_exit_codes.flags )
                            
                            if( !( setFlags.includes( 'socket_path' ) ) )
                                await process_exit( '--socket-path is required', new ReferenceError( `${ process.title } flags-error` ), shell_exit_codes.flags )
                            
                            for ( const flag in setFlags ) {
        
                                // eslint-disable-next-line default-case
                                switch ( setFlags[ flag ] ) {
            
                                    case 'hot': {
    
                                        shell.command.set.hot = process_parsed_argv.object[ setFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ setFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                                        
                                    }
                                        continue
                                    case 'socket_path':
    
                                        shell.command.set.socket_path = process_parsed_argv.object[ setFlags[ flag ] ].toString()
                                        delete process_parsed_argv.object[ setFlags[ flag ] ]
                                        process_parsed_argv.keys.splice( 0, 1 )
                                        
                                        break
                                    default: {
                                        let error = `\x1b[41m        flag \`${ setFlags[ flag ] }\` not recognize\x1b[0m\n`
                                        error += `\x1b[41m        run -> ${ process.title } set help[h]        \x1b[0m\n`
                                        await process_exit( error, new TypeError( `${ process.title } flags-error` ), shell_exit_codes.flags )
                                    }
                                }
                            }
                            
                            returns = shell
                        }
                            
                            break
                        default: {
                
                            let error = `\x1b[41m        command \`${ process_parsed_argv.keys[ flag ] }\` not recognize\x1b[0m\n`
                            error += `\x1b[41m        run -> ${ process.title } help[h]        \x1b[0m\n`
                            await process_exit( error, new TypeError( `${ process.title } commands-error` ), shell_exit_codes.commands )
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
                process_exit( error, new ReferenceError( 'internal-error' ), shell_exit_codes.internal ).catch( error => {throw error} )
            }
            
            if( error )
                reject( error )
            
            resolve( returns )
            
        } )
        
    },
} )
