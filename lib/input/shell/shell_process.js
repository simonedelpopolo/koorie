import { init_command } from '../../../input.js'
import { default as process_title } from '../process_title.js'
import { process_exit, shell_exit_codes } from '../../../index.js'

const shell_processSymbol = Symbol( 'Object [ input.process_title.shell_process ]' )
const shell_process = Object.defineProperty( process_title, shell_processSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Koorie-shell process.
     *
     * @param {object} process_parsed_argv - process.argv parsed.
     * @returns {Promise<Object<any>>}
     */
    value: async function koorie_process( process_parsed_argv ) {

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
         *      },
         *      performance: {
         *         refresh_rate:boolean|number,
         *         socket_path: boolean|string
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
                }
            }
        }

        for ( const flag in process_parsed_argv.keys ) {
            switch ( process_parsed_argv.keys[ flag ] ) {

                case 'init': {

                    delete shell.command.route
                    delete shell.command.set
                    delete shell.command.performance

                    await init_command(
                        process_parsed_argv.object[ process_parsed_argv.keys[ flag ] ]
                    )
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

                            case 'bare':

                                shell.command.init.bare = true
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

                }
                    break

                case 'performance': {
                    delete process_parsed_argv.object.performance
                    process_parsed_argv.keys.splice( 0, 1 )
                    delete shell.command.route
                    delete shell.command.init
                    delete shell.command.set

                    const memoryFlags = Object.keys( process_parsed_argv.object )
                    if( memoryFlags.length === 0 )
                        await process_exit( 'no flags? no party', new ReferenceError( `${ process.title } flags-error` ), shell_exit_codes.flags )

                    if( !( memoryFlags.includes( 'socket_path' ) ) )
                        await process_exit( '--socket-path is required', new ReferenceError( `${ process.title } flags-error` ), shell_exit_codes.flags )

                    for ( const flag in memoryFlags ) {

                        // eslint-disable-next-line default-case
                        switch ( memoryFlags[ flag ] ) {

                            case 'refresh_rate': {

                                shell.command.performance.refresh_rate = process_parsed_argv.object[ memoryFlags[ flag ] ].toNumber()
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
                                await process_exit( error, new TypeError( `${ process.title } flags-error` ), shell_exit_codes.flags )
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
                }

                    break
                default: {

                    let error = `\x1b[41m        command \`${ process_parsed_argv.keys[ flag ] }\` not recognize\x1b[0m\n`
                    error += `\x1b[41m        run -> ${ process.title } help[h]        \x1b[0m\n`
                    await process_exit( error, new TypeError( `${ process.title } commands-error` ), shell_exit_codes.commands )
                }

            }
        }

        return shell
    },
} )

export default shell_process[ shell_processSymbol ]
