import { Blaze } from '@cli-blaze/decors'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import {
    address_flag,
    cluster_flag,
    ejected_flag,
    experimental_log_writer_flag,
    health_flag,
    hot_flag,
    http2_flag,
    library_flag,
    logger_flag,
    middleware_flag,
    response_time_flag,
    secure_flag,
    silenced_flag,
    socket_flag,
    static_files_flag,
} from '../../../private.js'
import { number_, undefined_ } from 'oftypes'

/**
 * Koorie process.
 *
 * @param {object} process_parsed_argv - process.argv parsed.
 * @returns {Promise<Object<any>>}
 */
export default  async function koorie_process( process_parsed_argv ) {

    for ( const flag in process_parsed_argv.keys ) {

        switch ( process_parsed_argv.keys[ flag ] ) {

            case 'address':

                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await address_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--address accept only string.', error, error_code.FLAG )
                    } )

                continue

            case 'cluster':

                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await cluster_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--cluster accept only numbers or string "full".', error, error_code.FLAG )
                    } )

                continue

            case 'ejected':

                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await ejected_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--ejected accept only string.', error, error_code.FLAG )
                    } )

                continue

            case 'experimental_log_writer':

                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await experimental_log_writer_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--experimental-log-writer doesn\'t accept any argument', error, error_code.FLAG )
                    } )

                continue

            case 'health':

                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await health_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--health doesn\'t accept any argument', error, error_code.FLAG )
                    } )

                continue

            case 'hot':

                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await hot_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--hot accept only the string "false"|"true" or void.', error, error_code.FLAG )
                    } )

                continue

            case 'http2':

                if( ! ( process_parsed_argv.keys.includes( 'secure' ) ) )
                    await exit( '--http2 requires --secure to be set.', new ReferenceError( 'http2 - unsatisfied-error' ), error_code.FLAG )

                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await http2_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--http2 doesn\'t accept any argument', error, error_code.FLAG )
                    } )

                continue

            case 'library':

                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await library_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( async error => {
                        let message = ' --library accept only string.\n'
                        const library_flag = Blaze.underline( Blaze.green( '--library=' ) )
                        message += `    @ koorie [...] ${library_flag} -> ${Blaze.underline( Blaze.strong( Blaze.red( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ].toString() ) ) )} \n`
                        message += Blaze.red( '                                      ^' )
                        await exit( message, error, error_code.FLAG )
                    } )

                continue

            case 'logger': {

                /**
                 * @type {{}}
                 */
                const logger = await logger_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( error => exit( error.message, new TypeError( `${ process.title } flag-error` ), error_code.FLAG ) )

                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = logger.logger
            }
                continue

            case 'middleware':

                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await middleware_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--middleware accept only string.', error, error_code.FLAG )
                    } )

                continue

            case 'port':

                if( await undefined_( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] ) === false ) {

                    if ( await number_( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] ) === false )
                        await exit( '--port accept only numbers.', Error( `${ process.title } flags-error` ), error_code.FLAG )

                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = parseInt( process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] )

                } else
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = '0'

                continue

            case 'response_time': {

                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await response_time_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( async error => exit( '--response-time accept only true|false.', error, error_code.FLAG ) )
            }
                continue

            case 'secure': {

                /**
                 * @type {{secure: {}} | void}
                 */
                const secure = await secure_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( error => exit( error.message, new TypeError( `${ process.title } flags-error` ), error_code.FLAG ) )
                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = secure.secure
            }
                continue

            case 'silenced':

                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await silenced_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--silenced doesn\'t accept any argument', error, error_code.FLAG )
                    } )

                continue

            case 'socket': {

                /**
                 * @type {{socket: socket} | void}
                 */
                const socket = await socket_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( error => exit( error.message, new TypeError( `${ process.title } flags-error` ), error_code.FLAG ) )
                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = socket.socket

            }
                continue

            case 'static_files':

                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ] = await static_files_flag(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--static-files accept only string.', error, error_code.FLAG )
                    } )

                break

            default: {

                let error = `\x1b[41m        flag \`${ process_parsed_argv.keys[ flag ] }\` not recognize\x1b[0m\n`
                error += `\x1b[41m        run -> ${ process.title } help[h]        \x1b[0m\n`
                await exit( error, new TypeError( `${ process.title } flags-error` ), error_code.FLAG )
            }
        }

    }

    return process_parsed_argv.object
}
