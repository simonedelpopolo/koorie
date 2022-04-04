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
 * Object [ koorie.server ] Function arguments.
 *
 * @typedef {Object|null} KoorieServerArgumentProperties
 * @property {string} [address] - to listen from.
 * @property {string|number} [cluster] - only the string 'full' can be passed. server will be for fork in the specified number of process never more that the available CPUs. when 'full' will fork processes for the available CPUs.
 * @property {string} [ejected] - specified filename to load in **ejected state**
 * @property {void|boolean} [experimental_log_writer] - activate the experimental log writer.
 * @property {void|string} [health] - activate the health route.
 * @property {void|boolean|string} [hot] - **hot wired**
 * @property {string} [silenced] - reduced the size of the log, printed & written. and response time goes shut off.
 * @property {string} [library] - 'static' tells do not act for a specific library but just for static HTML files. 'react' | 'solid' | 'vue' will activate some special features for the library.
 * @property {{quiet:boolean=,write:string=}} [logger] - 'quiet:true' will silence the logger to stdout. 'write:/path/to/filename.json' will write the log to the specified file. extension should be .json because it saves JSON.
 * @property {string} [middleware] - it accept 'without' to override the required middleware file OR specify a different path/filename to import the mandatory middleware default function.
 * @property {string} [no_listening_check] - it doesn't run the on_listening_request check function.
 * @property {number|string} [port] - to listen from.@property {string} [middleware] - it accept 'without' to override the required middleware file OR specify a different path/filename to import the mandatory middleware default function.
 * @property {void|string} [response_time] - given this flag the server will not stdout the response time to an incoming request.
 * @property {{active:boolean,key:string,cert:string,dhparam:string=}} [secure] - activate the https server.
 * @property {{active:boolean,path:string}} [socket] - activate the socket connection to koorie.
 * @property {string} [static_files] - path to the 'public' directory where static files can be found by the server.
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
export { default as configuration__ } from './koorie/configuration.js'
export { default as dispatcher__ } from './koorie/dispatcher.js'
export { default as fork__ } from './koorie/fork.js'
export { default as health__ } from './koorie/health.js'
export { default as hot__ } from './koorie/hot.js'
export { default as ejected__ } from './koorie/ejected.js'
/**
 * Object [ koorie.model.read ]
 */
export { default as model_read__ } from './koorie/model/read.js'
/**
 * Object [ koorie.model.selector ]
 */
export { default as model_selector__ } from './koorie/model/selector.js'
export { default as model__ } from './koorie/model.js'
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
 * Object [ koorie.resource.mime_types.image] getter
 */
export { default as resource_get_image__ } from './koorie/resource/mime-types/get_image.js'
/**
 * Object [ koorie.resource.mime_types.text] getter
 */
export { default as resource_get_text__ } from './koorie/resource/mime-types/get_text.js'
/**
 * Object [ koorie.resource.mime_types.video] getter
 */
export { default as resource_get_video__ } from './koorie/resource/mime-types/get_video.js'
/**
 * Object [ koorie.resource.public] setter/getter
 */
export { default as resource_get_public__ } from './koorie/resource/get_public.js'
export { default as resource_set_public__ } from './koorie/resource/set_public.js'
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
 * Object [ koorie.routes.set.check ]
 */
export { default as routes_set_check__ } from './koorie/routes/set/check.js'
/**
 * Object [ koorie.routes.set ]
 */
export { default as routes_set__ } from './koorie/routes/set.js'
/**
 * Object [ koorie.routing.file ]
 */
export { default as routing_file__ } from './koorie/routing/file.js'
/**
 * Object [ koorie.routing.route ]
 */
export { default as routing_route__ } from './koorie/routing/route.js'
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
export { default as experimental_log_writer_flag__ } from './input/koorie/flag/experimental_log_writer_flag.js'
export { default as health_flag__ } from './input/koorie/flag/health_flag.js'
export { default as library_flag__ } from './input/koorie/flag/library_flag.js'
export { default as logger_flag__ } from './input/koorie/flag/logger_flag.js'
export { default as middleware_flag__ } from './input/koorie/flag/middleware_flag.js'
export { default as no_listening_check_flag__ } from './input/koorie/flag/no_listening_check_flag.js'
export { default as response_time_flag__ } from './input/koorie/flag/response_time_flag.js'
export { default as secure_flag__ } from './input/koorie/flag/secure_flag.js'
export { default as silenced_flag__ } from './input/koorie/flag/silenced_flag.js'
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
