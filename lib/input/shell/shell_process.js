import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { options } from '@cli-blaze/input'
import { undefined_ } from 'oftypes'
import {
    init_author_flag,
    init_bare_flag,
    init_command,
    init_description_flag,
    init_git_flag,
    init_license_flag,
    init_middleware_flag,
    init_name_flag,
    init_version_flag
} from '../../../private.js'

/**
 * Koorie-shell process.
 *
 * @param {object} process_parsed_argv - process.argv parsed.
 * @returns {Promise<Object<any>>}
 */
export default async function shell_process( process_parsed_argv ) {

    /**
     * - koorie-shell commands, flags and options
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
     *      },
     *      performance: {
     *         refresh_rate:boolean|number,
     *         socket_path: boolean|string
     *      },
     *      ssl: {
     *         generate : {
     *             path: boolean:string,
     *             key: boolean:string,
     *             cert: boolean:string,
     *             dhparam: boolean:string,
     *         }
     *      }
     *  }
     *}}
     */
    const shell = {
        command: {
            init: {
                git: false,
                middleware: false,
                version: false,
                name: false,
                description: false,
                author: false,
                bare: false,
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
            },
            performance: {
                refresh_rate: false,
                socket_path: false
            },
            ssl: {
                generate: {
                    path: false,
                    key: false,
                    cert:false,
                    dhparam: false,
                }
            }
        }
    }

    for ( const flag in process_parsed_argv.keys ) {
        switch ( process_parsed_argv.keys[ flag ] ) {

            case 'init': {

                delete shell.command.route
                delete shell.command.set
                delete shell.command.performance
                delete shell.command.ssl

                await init_command(
                    process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                )
                    .catch( error => exit( error.message, Error( `${ process.title } commands-error` ), error_code.COMMAND ) )

                delete process_parsed_argv.object.init
                process_parsed_argv.keys.splice( 0, 1 )

                const initFlags = Object.keys( process_parsed_argv.object )

                for ( const flag in initFlags ) {

                    switch ( initFlags[ flag ] ) {

                        case 'middleware':

                            shell.command.init.middleware = await init_middleware_flag(
                                process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                            )
                                .catch( async error => {
                                    await exit( '--middleware accept only string.', error, error_code.FLAG )
                                } )

                            delete process_parsed_argv.object[ initFlags[ flag ] ]
                            process_parsed_argv.keys.splice( 0, 1 )

                            continue

                        case 'bare':

                            shell.command.init.bare = await init_bare_flag(
                                process_parsed_argv.object[ initFlags[ flag ] ]
                            )
                                .catch( async error => {
                                    await exit( 'flag --bare doesn\'t accept any argument', error, error_code.FLAG )
                                } )

                            delete process_parsed_argv.object[ initFlags[ flag ] ]
                            process_parsed_argv.keys.splice( 0, 1 )

                            continue

                        case 'git':

                            shell.command.init.git = await init_git_flag(
                                process_parsed_argv.object[ initFlags[ flag ] ]
                            )
                                .catch( async error => {
                                    await exit( 'flag --git doesn\'t accept any argument', error, error_code.FLAG )
                                } )

                            delete process_parsed_argv.object[ initFlags[ flag ] ]
                            process_parsed_argv.keys.splice( 0, 1 )

                            continue

                        case 'version':

                            shell.command.init.version = await init_version_flag(
                                process_parsed_argv.object[ initFlags[ flag ] ]
                            )
                                .catch( async error => {
                                    await exit( `--version flag ${error.message}`, new TypeError( `${process.title} flags-error` ), error_code.FLAG )
                                } )

                            delete process_parsed_argv.object[ initFlags[ flag ] ]
                            process_parsed_argv.keys.splice( 0, 1 )

                            continue

                        case 'name':

                            shell.command.init.name = await init_name_flag(
                                process_parsed_argv.object[ initFlags[ flag ] ]
                            )
                                .catch( async error => {
                                    await exit( `--name flag ${error.message}`, new TypeError( `${process.title} flags-error` ), error_code.FLAG )
                                } )

                            delete process_parsed_argv.object[ initFlags[ flag ] ]
                            process_parsed_argv.keys.splice( 0, 1 )

                            continue

                        case 'description':

                            shell.command.init.description = await init_description_flag(
                                process_parsed_argv.object[ initFlags[ flag ] ]
                            )
                                .catch( async error => {
                                    await exit( '--description accept only string.', error, error_code.FLAG )
                                } )

                            delete process_parsed_argv.object[ initFlags[ flag ] ]
                            process_parsed_argv.keys.splice( 0, 1 )

                            continue

                        case 'author':

                            shell.command.init.author = await init_author_flag(
                                process_parsed_argv.object[ initFlags[ flag ] ]
                            )
                                .catch( async error => {
                                    await exit( '--author accept only string.', error, error_code.FLAG )
                                } )

                            delete process_parsed_argv.object[ initFlags[ flag ] ]
                            process_parsed_argv.keys.splice( 0, 1 )

                            continue

                        case 'license':

                            shell.command.init.license = await init_license_flag(
                                process_parsed_argv.object[ initFlags[ flag ] ]
                            )
                                .catch( async error => {
                                    await exit( '--license accept only string.', error, error_code.FLAG )
                                } )
                            delete process_parsed_argv.object[ initFlags[ flag ] ]
                            process_parsed_argv.keys.splice( 0, 1 )

                            break

                        default: {
                            let error = `\x1b[41m        flag \`${ initFlags[ flag ] }\` not recognize\x1b[0m\n`
                            error += `\x1b[41m        run -> ${ process.title } init help[h]        \x1b[0m\n`
                            await exit( error, new TypeError( `${ process.title } flags-error` ), error_code.FLAG )
                        }
                    }
                }

            }
                break
            case 'performance': {
                delete process_parsed_argv.object.performance
                process_parsed_argv.keys.splice( 0, 1 )
                delete shell.command.route
                delete shell.command.init
                delete shell.command.set
                delete shell.command.ssl

                const memoryFlags = Object.keys( process_parsed_argv.object )
                if( memoryFlags.length === 0 )
                    await exit( 'no flags? no party', new ReferenceError( `${ process.title } flags-error` ), error_code.FLAG )

                if( !( memoryFlags.includes( 'socket_path' ) ) )
                    await exit( '--socket-path is required', new ReferenceError( `${ process.title } flags-error` ), error_code.FLAG )

                for ( const flag in memoryFlags ) {

                    // eslint-disable-next-line default-case
                    switch ( memoryFlags[ flag ] ) {

                        case 'refresh_rate': {

                            shell.command.performance.refresh_rate = parseInt( process_parsed_argv.object[ memoryFlags[ flag ] ] )
                            delete process_parsed_argv.object[ memoryFlags[ flag ] ]
                            process_parsed_argv.keys.splice( 0, 1 )

                        }
                            continue
                        case 'socket_path':

                            shell.command.performance.socket_path = process_parsed_argv.object[ memoryFlags[ flag ] ].toString()
                            delete process_parsed_argv.object[ memoryFlags[ flag ] ]
                            process_parsed_argv.keys.splice( 0, 1 )

                            break
                        default: {
                            let error = `\x1b[41m        flag \`${ memoryFlags[ flag ] }\` not recognize\x1b[0m\n`
                            error += `\x1b[41m        run -> ${ process.title } performance help[h]        \x1b[0m\n`
                            await exit( error, new TypeError( `${ process.title } flags-error` ), error_code.FLAG )
                        }
                    }
                }
            }
                break
            case 'set': {

                delete process_parsed_argv.object.set
                process_parsed_argv.keys.splice( 0, 1 )
                delete shell.command.route
                delete shell.command.init
                delete shell.command.performance
                delete shell.command.ssl

                const setFlags = Object.keys( process_parsed_argv.object )
                if( setFlags.length === 0 )
                    await exit( 'no flags? no party', new ReferenceError( `${ process.title } flags-error` ), error_code.FLAG )

                if( !( setFlags.includes( 'socket_path' ) ) )
                    await exit( '--socket-path is required', new ReferenceError( `${ process.title } flags-error` ), error_code.FLAG )

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
                            await exit( error, new TypeError( `${ process.title } flags-error` ), error_code.FLAG )
                        }
                    }
                }
            }

                break
            case 'ssl': {

                delete process_parsed_argv.object.ssl
                process_parsed_argv.keys.splice( 0, 1 )
                delete shell.command.route
                delete shell.command.init
                delete shell.command.performance
                delete shell.command.set

                const sslFlags = Object.keys( process_parsed_argv.object )

                for ( const flag in sslFlags ) {

                    switch ( sslFlags[ flag ] ) {

                        case 'generate': {


                            if( await undefined_( process_parsed_argv.object[ sslFlags[ flag ] ] ) === true ){
                                shell.command.ssl.generate = {
                                    path: false,
                                    key: false,
                                    cert: false,
                                    dhparam: false,
                                }
                            }else {
                                const { path, key, cert, dhparam } = await options( process_parsed_argv.object[ sslFlags[ flag ] ], 'ssl --generate flags' )
                                shell.command.ssl.generate = {
                                    path: path || false,
                                    key: key || false,
                                    cert: cert || false,
                                    dhparam: dhparam || false,
                                }
                            }
                        }
                            break

                        default: {
                            let error = `\x1b[41m        flag \`${ sslFlags[ flag ] }\` not recognize\x1b[0m\n`
                            error += `\x1b[41m        run -> ${ process.title } init help[h]        \x1b[0m\n`
                            await exit( error, new TypeError( `${ process.title } flags-error` ), error_code.FLAG )
                        }
                    }
                }
            }

                break
            default: {

                let error = `\x1b[41m        command \`${ process_parsed_argv.keys[ flag ] }\` not recognize\x1b[0m\n`
                error += `\x1b[41m        run -> ${ process.title } help[h]        \x1b[0m\n`
                await exit( error, new TypeError( `${ process.title } commands-error` ), error_code.COMMAND )
            }

        }
    }

    return shell
}
