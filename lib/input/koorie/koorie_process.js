import { default as process_title } from '../process_title.js'
import {
    address_flag,
    cluster_flag,
    ejected_flag,
    health_flag,
    hot_flag,
    library_flag,
    logger_flag,
    middleware_flag,
    response_time_flag,
    secure_flag,
    socket_flag,
    static_files_flag,
} from '../../../input.js'
import { number_, undefined_ } from 'oftypes'
import { process_exit, shell_exit_codes } from '../../../index.js'


const koorie_processSymbol = Symbol( 'Object [ input.process_title.koorie_process ]' )
const koorie_process = Object.defineProperty( process_title, koorie_processSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Koorie process.
     *
     * @param {object} process_parsed_argv - process.argv parsed.
     * @returns {Promise<Object<any>>}
     */
    value: async function koorie_process( process_parsed_argv ) {

        for ( const flag in process_parsed_argv.keys ) {

            switch ( process_parsed_argv.keys[ flag ] ) {

                case 'a':
                case 'address':

                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await address_flag(
                        process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                    )
                        .catch( async error => {
                            await process_exit( '--address accept only string.', error, shell_exit_codes.flags )
                        } )

                    continue

                case 'c':
                case 'cluster':

                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await cluster_flag(
                        process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                    )
                        .catch( async error => {
                            await process_exit( '--cluster accept only numbers or string "full".', error, shell_exit_codes.flags )
                        } )

                    continue

                case 'health':

                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await health_flag(
                        process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                    )
                        .catch( async error => {
                            await process_exit( '--health doesn\'t accept any argument', error, shell_exit_codes.flags )
                        } )

                    continue

                case 'hot':

                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await hot_flag(
                        process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                    )
                        .catch( async error => {
                            await process_exit( '--hot accept only the string "false"|"true" or void.', error, shell_exit_codes.flags )
                        } )

                    continue

                case 'ejected':

                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await ejected_flag(
                        process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                    )
                        .catch( async error => {
                            await process_exit( '--ejected accept only string.', error, shell_exit_codes.flags )
                        } )

                    continue

                case 'lb':
                case 'library':

                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await library_flag(
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

                    /**
                     * @type {{}}
                     */
                    const logger = await logger_flag(
                        process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                    )
                        .catch( error => process_exit( error.message, new TypeError( `${ process.title } flags-error` ), shell_exit_codes.flags ) )

                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = logger.logger
                }
                    continue

                case 'm':
                case 'middleware':

                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await middleware_flag(
                        process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                    )
                        .catch( async error => {
                            await process_exit( '--middleware accept only string.', error, shell_exit_codes.flags )
                        } )

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

                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await response_time_flag(
                        process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                    )
                        .catch( async error => process_exit( '--response-time accept only true|false.', error, shell_exit_codes.flags ) )
                }
                    continue
                case 'secure': {

                    /**
                     * @type {{secure: {}} | void}
                     */
                    const secure = await secure_flag(
                        process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                    )
                        .catch( error => process_exit( error.message, new TypeError( `${ process.title } flags-error` ), shell_exit_codes.flags ) )
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = secure.secure
                }
                    continue

                case 'sk':
                case 'socket': {

                    /**
                     * @type {{socket: socket} | void}
                     */
                    const socket = await socket_flag(
                        process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                    )
                        .catch( error => process_exit( error.message, new TypeError( `${ process.title } flags-error` ), shell_exit_codes.flags ) )
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = socket.socket

                }
                    continue

                case 's':
                case 'static_files':

                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await static_files_flag(
                        process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                    )
                        .catch( async error => {
                            await process_exit( '--static-files accept only string.', error, shell_exit_codes.flags )
                        } )

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

        return process_parsed_argv.object
    },
} )

export default koorie_process[ koorie_processSymbol ]
