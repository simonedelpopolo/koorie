import { createRequire } from 'module'
/**
 * JSDoc typedef
 *
 * @global
 */
/**
 * Represents an async function.
 *
 * @typedef {()=>Promise} AsyncFunction
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
 * @property {void|boolean} [http2] - activate the http2 server.
 * @property {string} [silenced] - reduced the size of the log, printed & written. and response time goes shut off.
 * @property {string} [library] - 'static' tells do not act for a specific library but just for static HTML files. 'react' | 'solid' | 'vue' will activate some special features for the library.
 * @property {{quiet:boolean=,write:string=}} [logger] - 'quiet:true' will silence the logger to stdout. 'write:/path/to/filename.json' will write the log to the specified file. extension should be .json because it saves JSON.
 * @property {string} [middleware] - it accept 'without' to override the required middleware file OR specify a different path/filename to import the mandatory middleware default function.
 * @property {number|string} [port] - to listen from.@property {string} [middleware] - it accept 'without' to override the required middleware file OR specify a different path/filename to import the mandatory middleware default function.
 * @property {void|string} [response_time] - given this flag the server will not stdout the response time to an incoming request.
 * @property {{active:boolean,key:string,cert:string,dhparam:string=}} [secure] - activate the https server.
 * @property {{active:boolean,path:string}} [socket] - activate the socket connection to koorie.
 * @property {string} [static_files] - path to the 'public' directory where static files can be found by the server.
 */

/**
 * Extends Promise and incorporate Object [ koorie.request ]
 * Used into routes to return responses.
 */
export { default as Answer } from './lib/koorie/answer.js'

/**
 * Object [ input ]
 *
 * @private
 */
export { default as koorie_process } from './lib/input/koorie/koorie_process.js'
export { default as shell_process } from './lib/input/shell/shell_process.js'

/**
 * Object [ monitor ]
 *
 * @private
 */
export { default as memory } from './lib/koorie/monitor/memory.js'
export { default as os_uptime } from './lib/koorie/monitor/os_uptime.js'
export { default as host_os } from './lib/koorie/monitor/host_os.js'

/**
 * Object [ koorie ].
 *
 * @private
 */
export { default as config } from './lib/koorie/config.js'
export { default as dispatcher } from './lib/koorie/dispatcher.js'
export { default as fork } from './lib/koorie/fork.js'
export { default as health } from './lib/koorie/health.js'
export { default as hot } from './lib/koorie/hot.js'
export { default as ejected } from './lib/koorie/ejected.js'
/**
 * Object [ koorie.model.read ]
 */
export { default as model_read } from './lib/koorie/model/read.js'
/**
 * Object [ koorie.model.selector ]
 */
export { default as model_selector } from './lib/koorie/model/selector.js'
export { default as model } from './lib/koorie/model.js'
export { default as logger } from './lib/koorie/logger.js'
export { default as outgoing } from './lib/koorie/outgoing.js'
/**
 * Object [ koorie.request.body.get ]
 */
export { default as request_body_get } from './lib/koorie/request/body/get.js'
/**
 * Object [ koorie.request.query.get ]
 */
export { default as request_query_get } from './lib/koorie/request/query/get.js'
/**
 * Object [ koorie.request.body ]
 */
export { default as request_body } from './lib/koorie/request/body.js'
/**
 * Object [ koorie.request.get ]
 */
export { default as request_get } from './lib/koorie/request/get.js'
/**
 * Object [ koorie.request.post ]
 */
export { default as request_post } from './lib/koorie/request/post.js'
/**
 * Object [ koorie.request.query ]
 */
export { default as request_query } from './lib/koorie/request/query.js'
/**
 * Object [ koorie.request.routes ]
 */
export { default as request_routes } from './lib/koorie/request/routes.js'
export { default as request } from './lib/koorie/request.js'
/**
 * Object [ koorie.resource.mime_types.application] getter
 */
export { default as resource_get_application } from './lib/koorie/resource/mime-types/get_application.js'
/**
 * Object [ koorie.resource.mime_types.image] getter
 */
export { default as resource_get_image } from './lib/koorie/resource/mime-types/get_image.js'
/**
 * Object [ koorie.resource.mime_types.text] getter
 */
export { default as resource_get_text } from './lib/koorie/resource/mime-types/get_text.js'
/**
 * Object [ koorie.resource.mime_types.video] getter
 */
export { default as resource_get_video } from './lib/koorie/resource/mime-types/get_video.js'
/**
 * Object [ koorie.resource.public] setter/getter
 */
export { default as resource_get_public } from './lib/koorie/resource/get_public.js'
export { default as resource_set_public } from './lib/koorie/resource/set_public.js'
/**
 * Object [ koorie.routes.collection ]
 */
export { default as routes_collection } from './lib/koorie/routes/collection.js'
/**
 * Object [ koorie.routes.get ]
 */
export { default as routes_get } from './lib/koorie/routes/get.js'
/**
 * Object [ koorie.routes.inject ]
 */
export { default as routes_inject } from './lib/koorie/routes/inject.js'
/**
 * Object [ koorie.routes.injected ]
 */
export { default as routes_injected } from './lib/koorie/routes/injected.js'
/**
 * Object [ koorie.routes.set.check ]
 */
export { default as routes_set_check } from './lib/koorie/routes/set/check.js'
/**
 * Object [ koorie.routes.set ]
 */
export { default as routes_set } from './lib/koorie/routes/set.js'
/**
 * Object [ koorie.routing.all ]
 */
export { default as routing_all } from './lib/koorie/routing/all.js'
/**
 * Object [ koorie.routing.file ]
 */
export { default as routing_file } from './lib/koorie/routing/file.js'
/**
 * Object [ koorie.routing.route ]
 */
export { default as routing_route } from './lib/koorie/routing/route.js'
export { default as routing } from './lib/koorie/routing.js'
/**
 * Object [ koorie.server.resolvers ]
 */
export { default as server_resolvers } from './lib/koorie/server/resolvers.js'
export { default as server } from './lib/koorie/server.js'
/**
 * Object [ koorie.socket.api.hot
 */
export { default as api_hot } from './lib/koorie/socket/api/hot.js'
/**
 * Object [ koorie.socket.api.memory
 */
export { default as api_memory } from './lib/koorie/socket/api/memory.js'
export { default as socket } from './lib/koorie/socket.js'
export { default as cluster_system_check } from './lib/koorie/fork/cluster_system_check.js'
export { default as http } from './lib/koorie/server/http.js'
export { default as https } from './lib/koorie/server/https.js'
export { default as http2 } from './lib/koorie/server/http2.js'

/**
 * Object [ shell ].
 *
 * @private
 */
export { default as performance } from './lib/shell/performance.js'
export { default as ssl } from './lib/shell/ssl.js'
export { default as init } from './lib/shell/init.js'
export { default as set } from './lib/shell/set.js'

/**
 * Object [ input ].
 *
 * @private
 */

/**
 * Object [ input.generator ]
 */
export { default as generator } from './lib/input/generator.js'
/**
 * Object [ input.promise ]
 */
export { default as promise } from './lib/input/promise.js'
/**
 * Object [ input.type.only_string ]
 */
export { default as only_string } from './lib/input/accepts/only_string.js'
/**
 * Object [ input.type.only_void ]
 */
export { default as only_void } from './lib/input/accepts/only_void.js'

/**
 * - koorie flags.
 *
 * @private
 */
export { default as address_flag } from './lib/input/koorie/flag/address_flag.js'
export { default as cluster_flag } from './lib/input/koorie/flag/cluster_flag.js'
export { default as ejected_flag } from './lib/input/koorie/flag/ejected_flag.js'
export { default as experimental_log_writer_flag } from './lib/input/koorie/flag/experimental_log_writer_flag.js'
export { default as health_flag } from './lib/input/koorie/flag/health_flag.js'
export { default as hot_flag } from './lib/input/koorie/flag/hot_flag.js'
export { default as http2_flag } from './lib/input/koorie/flag/http2_flag.js'
export { default as library_flag } from './lib/input/koorie/flag/library_flag.js'
export { default as logger_flag } from './lib/input/koorie/flag/logger_flag.js'
export { default as middleware_flag } from './lib/input/koorie/flag/middleware_flag.js'
export { default as response_time_flag } from './lib/input/koorie/flag/response_time_flag.js'
export { default as secure_flag } from './lib/input/koorie/flag/secure_flag.js'
export { default as silenced_flag } from './lib/input/koorie/flag/silenced_flag.js'
export { default as socket_flag } from './lib/input/koorie/flag/socket_flag.js'
export { default as static_files_flag } from './lib/input/koorie/flag/static_files_flag.js'

/**
 * - koorie-shell commands and flags.
 *
 * @private
 */
export { default as init_command } from './lib/input/shell/command/init_command.js'
export { default as init_middleware_flag } from './lib/input/shell/flag/init_middleware_flag.js'
export { default as init_bare_flag } from './lib/input/shell/flag/init_bare_flag.js'
export { default as init_git_flag } from './lib/input/shell/flag/init_git_flag.js'
export { default as init_version_flag } from './lib/input/shell/flag/init_version_flag.js'
export { default as init_description_flag } from './lib/input/shell/flag/init_description_flag.js'
export { default as init_author_flag } from './lib/input/shell/flag/init_author_flag.js'
export { default as init_name_flag } from './lib/input/shell/flag/init_name_flag.js'
export { default as init_license_flag } from './lib/input/shell/flag/init_license_flag.js'

const require = createRequire( import.meta.url )
export const { version } = require( './package.json' )
