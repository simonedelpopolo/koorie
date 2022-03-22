/**
 * JSDoc typedef
 *
 * @global
 */
/**
 * Represents an async function.
 *
 * @typedef {Function} AsyncFunction
 */

/**
 * Extends
 *
 * @private
 */

/**
 * A set of conversion utilities
 */
await import( './extends/String/conversion/toBuffer.js' )
await import( './extends/String/conversion/toNumber.js' )
/**
 * - stdout text decoration
 */
await import( './extends/String/decoration/strong.js' )
await import( './extends/String/decoration/underline.js' )
/**
 * - stdout text colors
 */
await import( './extends/String/color/fg/color.js' )
await import( './extends/String/color/fg/black.js' )
await import( './extends/String/color/fg/blue.js' )
await import( './extends/String/color/fg/cyan.js' )
await import( './extends/String/color/fg/green.js' )
await import( './extends/String/color/fg/magenta.js' )
await import( './extends/String/color/fg/red.js' )
await import( './extends/String/color/fg/white.js' )
await import( './extends/String/color/fg/yellow.js' )
/**
 * - stdout background colors
 */
await import( './extends/String/color/bg/color.js' )
await import( './extends/String/color/bg/black.js' )
await import( './extends/String/color/bg/blue.js' )
await import( './extends/String/color/bg/cyan.js' )
await import( './extends/String/color/bg/green.js' )
await import( './extends/String/color/bg/magenta.js' )
await import( './extends/String/color/bg/red.js' )
await import( './extends/String/color/bg/white.js' )
await import( './extends/String/color/bg/yellow.js' )
/**
 * Extends Promise and incorporate Object [ koorie.request ]
 * Used into routes to return responses.
 */
export { default as Answer__ } from './extends/Promise/Answer.js'

/**
 * Object [ activity ]
 *
 * @private
 */
export { default as exit__ } from './activity/exit.js'
export { default as stderr__ } from './activity/stderr.js'
export { default as exit_types__ } from './activity/exit/types.js'

/**
 * Object [ config ] .koorierc configuration file.
 *
 * @private
 */
/**
 * Object [ config.parser]
 */
export { default as config_parser_get__ } from './config/parser/get.js'
export { default as config_parser_set__ } from './config/parser/set.js'

/**
 * Object [ errors ]
 *
 * @private
 */
export { default as shell_exit_codes__ } from './errors/shell.js'

/**
 * Object [ input ]
 *
 * @private
 */
export { default as processor__ } from './input/processor.js'
export { default as entry_point__ } from './input/entry_point.js'
export { default as options__ } from './input/options.js'
export { default as process_title__ } from './input/process_title.js'
export { default as koorie_process__ } from './input/koorie/koorie_process.js'
export { default as shell_process__ } from './input/shell/shell_process.js'

/**
 * Object [ monitor ]
 *
 * @private
 */
export { default as memory__ } from './monitor/memory.js'
export { default as os_uptime__ } from './monitor/os_uptime.js'
export { default as host_os__ } from './monitor/host_os.js'

/**
 * Object [ koorie ].
 *
 * @private
 */
export { default as fork__ } from './koorie/fork.js'
export { default as health__ } from './koorie/health.js'
export { default as hot__ } from './koorie/hot.js'
export { default as ejected__ } from './koorie/ejected.js'
/**
 * Object [ koorie.library.read ]
 */
export { default as library_read__ } from './koorie/library/read.js'
export { default as library__ } from './koorie/library.js'
export { default as logger__ } from './koorie/logger.js'
export { default as outgoing__ } from './koorie/outgoing.js'
/**
 * Object [ koorie.request.body.get ]
 */
export { default as request_body_get__ } from './koorie/request/body/get.js'
/**
 * Object [ koorie.request.query.get ]
 */
export { default as request_query_get__ } from './koorie/request/query/get.js'
/**
 * Object [ koorie.request.body ]
 */
export { default as request_body__ } from './koorie/request/body.js'
/**
 * Object [ koorie.request.get ]
 */
export { default as request_get__ } from './koorie/request/get.js'
/**
 * Object [ koorie.request.post ]
 */
export { default as request_post__ } from './koorie/request/post.js'
/**
 * Object [ koorie.request.query ]
 */
export { default as request_query__ } from './koorie/request/query.js'
/**
 * Object [ koorie.request.routes ]
 */
export { default as request_routes__ } from './koorie/request/routes.js'
export { default as request__ } from './koorie/request.js'
/**
 * Object [ koorie.resource.mime_types.application] getter
 */
export { default as resource_get_application__ } from './koorie/resource/mime-types/get_application.js'
/**
 * Object [ koorie.resource.mime_types.images] getter
 */
export { default as resource_get_images__ } from './koorie/resource/mime-types/get_images.js'
/**
 * Object [ koorie.resource.mime_types.text] getter
 */
export { default as resource_get_text__ } from './koorie/resource/mime-types/get_text.js'
/**
 * Object [ koorie.resource.public] setter/getter
 */
export { default as resource_get_public__ } from './koorie/resource/get_public.js'
export { default as resource_set_public__ } from './koorie/resource/set_public.js'
export { default as resource__ } from './koorie/resource.js'
/**
 * Object [ koorie.routes.collection ]
 */
export { default as routes_collection__ } from './koorie/routes/collection.js'
/**
 * Object [ koorie.routes.get ]
 */
export { default as routes_get__ } from './koorie/routes/get.js'
/**
 * Object [ koorie.routes.inject ]
 */
export { default as routes_inject__ } from './koorie/routes/inject.js'
/**
 * Object [ koorie.routes.injected ]
 */
export { default as routes_injected__ } from './koorie/routes/injected.js'
/**
 * Object [ koorie.routes.set ]
 */
export { default as routes_set__ } from './koorie/routes/set.js'
export { default as routes__ } from './koorie/routes.js'
export { default as routing__ } from './koorie/routing.js'
/**
 * Object [ koorie.server.resolvers ]
 */
export { default as server_resolvers__ } from './koorie/server/resolvers.js'
export { default as server__ } from './koorie/server.js'
/**
 * Object [ koorie.socket.api.hot
 */
export { default as api_hot__ } from './koorie/socket/api/hot.js'
/**
 * Object [ koorie.socket.api.memory
 */
export { default as api_memory__ } from './koorie/socket/api/memory.js'
export { default as socket__ } from './koorie/socket.js'
export { default as cluster_system_check__ } from './koorie/fork/cluster_system_check.js'
export { default as http__ } from './koorie/server/http.js'
export { default as https__ } from './koorie/server/https.js'

/**
 * Object [ shell ].
 *
 * @private
 */
export { default as performance__ } from './shell/performance.js'
export { default as ssl__ } from './shell/ssl.js'
export { default as init__ } from './shell/init.js'
export { default as set__ } from './shell/set.js'

/**
 * Object [ input ].
 *
 * @private
 */
/**
 * - koorie flags.
 *
 * @private
 */
export { default as address_flag__ } from './input/koorie/flag/address_flag.js'
export { default as cluster_flag__ } from './input/koorie/flag/cluster_flag.js'
export { default as hot_flag__ } from './input/koorie/flag/hot_flag.js'
export { default as ejected_flag__ } from './input/koorie/flag/ejected_flag.js'
export { default as health_flag__ } from './input/koorie/flag/health_flag.js'
export { default as library_flag__ } from './input/koorie/flag/library_flag.js'
export { default as logger_flag__ } from './input/koorie/flag/logger_flag.js'
export { default as middleware_flag__ } from './input/koorie/flag/middleware_flag.js'
export { default as response_time_flag__ } from './input/koorie/flag/response_time_flag.js'
export { default as secure_flag__ } from './input/koorie/flag/secure_flag.js'
export { default as socket_flag__ } from './input/koorie/flag/socket_flag.js'
export { default as static_files_flag__ } from './input/koorie/flag/static_files_flag.js'

/**
 * - koorie-shell commands and flags.
 *
 * @private
 */
export { default as init_command__ } from './input/shell/command/init_command.js'
export { default as init_middleware_flag__ } from './input/shell/flag/init_middleware_flag.js'
export { default as init_bare_flag__ } from './input/shell/flag/init_bare_flag.js'
export { default as init_git_flag__ } from './input/shell/flag/init_git_flag.js'
export { default as init_version_flag__ } from './input/shell/flag/init_version_flag.js'
export { default as init_description_flag__ } from './input/shell/flag/init_description_flag.js'
export { default as init_author_flag__ } from './input/shell/flag/init_author_flag.js'
export { default as init_name_flag__ } from './input/shell/flag/init_name_flag.js'
export { default as init_license_flag__ } from './input/shell/flag/init_license_flag.js'
