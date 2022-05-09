import { Blaze } from '@cli-blaze/decors'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { koorie_version_flag } from './flag/version.js'
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
import { number_, OftypesError, undefined_ } from 'oftypes'

/**
 * Koorie process.
 *
 * @param {object} parsed - process.argv parsed.
 * @returns {Promise<Object<any>>}
 */
export default  async function koorie_process( parsed ) {

    for ( const flag in parsed.keys ) {

        switch ( parsed.keys[ flag ] ) {

            case 'v':
            case 'version':

                for await ( const type of await koorie_version_flag( parsed.object[ parsed.keys[ flag ] ] ) ) {
                    if ( type instanceof Error )
                        await exit( type.message, new OftypesError( '♠︎' ), error_code.FLAG )
                }

                process.stdout.write( `${await ( await import( '../../../package.json', { assert: { type: 'json' } } ) ).default.version}\n` )
                process.exit( 0 )

                break

            case 'address':

                parsed.object[ parsed.keys[ flag ] ] = await address_flag(
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--address accept only string.', error, error_code.FLAG )
                    } )

                continue

            case 'cluster':

                parsed.object[ parsed.keys[ flag ] ] = await cluster_flag(
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--cluster accept only numbers or string "full".', error, error_code.FLAG )
                    } )

                continue

            case 'ejected':

                parsed.object[ parsed.keys[ flag ] ] = await ejected_flag(
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--ejected accept only string.', error, error_code.FLAG )
                    } )

                continue

            case 'experimental_log_writer':

                parsed.object[ parsed.keys[ flag ] ] = await experimental_log_writer_flag(
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--experimental-log-writer doesn\'t accept any argument', error, error_code.FLAG )
                    } )

                continue

            case 'health':

                parsed.object[ parsed.keys[ flag ] ] = await health_flag(
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--health doesn\'t accept any argument', error, error_code.FLAG )
                    } )

                continue

            case 'hot':

                parsed.object[ parsed.keys[ flag ] ] = await hot_flag(
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--hot accept only the string "false"|"true" or void.', error, error_code.FLAG )
                    } )

                continue

            case 'http2':

                if( ! ( parsed.keys.includes( 'secure' ) ) )
                    await exit( '--http2 requires --secure to be set.', new ReferenceError( 'http2 - unsatisfied-error' ), error_code.FLAG )

                parsed.object[ parsed.keys[ flag ] ] = await http2_flag(
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--http2 doesn\'t accept any argument', error, error_code.FLAG )
                    } )

                continue

            case 'library':

                parsed.object[ parsed.keys[ flag ] ] = await library_flag(
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( async error => {
                        let message = ' --library accept only string.\n'
                        const library_flag = Blaze.underline( Blaze.green( '--library=' ) )
                        message += `    @ koorie [...] ${library_flag} -> ${Blaze.underline( Blaze.strong( Blaze.red( parsed.object[ parsed.keys[ flag ] ].toString() ) ) )} \n`
                        message += Blaze.red( '                                      ^' )
                        await exit( message, error, error_code.FLAG )
                    } )

                continue

            case 'logger': {

                /**
                 * @type {{}}
                 */
                const logger = await logger_flag(
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( error => exit( error.message, new TypeError( `${ process.title } flag-error` ), error_code.FLAG ) )

                parsed.object[ parsed.keys[ flag ] ] = logger.logger
            }
                continue

            case 'middleware':

                parsed.object[ parsed.keys[ flag ] ] = await middleware_flag(
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--middleware accept only string.', error, error_code.FLAG )
                    } )

                continue

            case 'port':

                if( await undefined_( parsed.object[ parsed.keys[ flag ] ] ) === false ) {

                    if ( await number_( parsed.object[ parsed.keys[ flag ] ] ) === false )
                        await exit( '--port accept only numbers.', Error( `${ process.title } flags-error` ), error_code.FLAG )

                    parsed.object[ parsed.keys[ flag ] ] = parseInt( parsed.object[ parsed.keys[ flag ] ] )

                } else
                    parsed.object[ parsed.keys[ flag ] ] = '0'

                continue

            case 'response_time': {

                parsed.object[ parsed.keys[ flag ] ] = await response_time_flag(
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( async error => exit( '--response-time accept only true|false.', error, error_code.FLAG ) )
            }
                continue

            case 'secure': {

                /**
                 * @type {{secure: {}} | void}
                 */
                const secure = await secure_flag(
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( error => exit( error.message, new TypeError( `${ process.title } flags-error` ), error_code.FLAG ) )
                parsed.object[ parsed.keys[ flag ] ] = secure.secure
            }
                continue

            case 'silenced':

                parsed.object[ parsed.keys[ flag ] ] = await silenced_flag(
                    parsed.object[ parsed.keys[ flag ] ]
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
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( error => exit( error.message, new TypeError( `${ process.title } flags-error` ), error_code.FLAG ) )
                parsed.object[ parsed.keys[ flag ] ] = socket.socket

            }
                continue

            case 'static_files':

                parsed.object[ parsed.keys[ flag ] ] = await static_files_flag(
                    parsed.object[ parsed.keys[ flag ] ]
                )
                    .catch( async error => {
                        await exit( '--static-files accept only string.', error, error_code.FLAG )
                    } )

                break

            default: {

                let error = `\x1b[41m        flag \`${ parsed.keys[ flag ] }\` not recognize\x1b[0m\n`
                error += `\x1b[41m        run -> ${ process.title } help[h]        \x1b[0m\n`
                await exit( error, new TypeError( `${ process.title } flags-error` ), error_code.FLAG )
            }
        }

    }

    return parsed.object
}
