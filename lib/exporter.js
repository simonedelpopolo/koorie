import { init, initSymbol } from './shell/init.js'
import { memory, memorySymbol } from './monitor/memory.js'
import { performance, performanceSymbol } from './shell/performance.js'
import { set, setSymbol } from './shell/set.js'

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
export { default as parser__ } from './config/parser.js'

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
export const memory__ = memory[ memorySymbol ]

/**
 * Object [ koorie ].
 *
 * @private
 */
export { default as body__ } from './koorie/body.js'
export { default as fork__ } from './koorie/fork.js'
export { default as hot__ } from './koorie/hot.js'
export { default as ejected__ } from './koorie/ejected.js'
/**
 * Object [ koorie.library.read ]
 */
export { default as library_read__ } from './koorie/library/read.js'
export { default as library__ } from './koorie/library.js'
export { default as logger__ } from './koorie/logger.js'
export { default as outgoing__ } from './koorie/outgoing.js'
export { default as query__ } from './koorie/query.js'
export { default as request__ } from './koorie/request.js'
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
export { default as cluster_types__ } from './koorie/fork/cluster_types.js'
export { default as http__ } from './koorie/server/http.js'
export { default as https__ } from './koorie/server/https.js'
export const set__ = set[ setSymbol ]

/**
 * Object [ shell ].
 *
 * @private
 */
export { default as ssl__ } from './shell/ssl.js'
export const init__ = init[ initSymbol ]
export const performance__ = performance[ performanceSymbol ]

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
export { default as address_flag__ } from './input/koorie/address_flag.js'
export { default as cluster_flag__ } from './input/koorie/cluster_flag.js'
export { default as hot_flag__ } from './input/koorie/hot_flag.js'
export { default as ejected_flag__ } from './input/koorie/ejected_flag.js'
export { default as library_flag__ } from './input/koorie/library_flag.js'
export { default as logger_flag__ } from './input/koorie/logger_flag.js'
export { default as middleware_flag__ } from './input/koorie/middleware_flag.js'
export { default as response_time_flag__ } from './input/koorie/response_time_flag.js'
export { default as secure_flag__ } from './input/koorie/secure_flag.js'
export { default as socket_flag__ } from './input/koorie/socket_flag.js'
export { default as static_files_flag__ } from './input/koorie/static_files_flag.js'

/**
 * - koorie-shell commands and flags.
 *
 * @private
 */
export { default as init_command__ } from './input/shell/init_command.js'
