import { server_resolvers__ } from './koorie/server/resolvers.js'
import { api, apiSymbol } from './koorie/socket/api.js'
import { body, bodySymbol } from './koorie/body.js'
import { fork, forkSymbol } from './koorie/fork.js'
import { hot, hotSymbol } from './koorie/hot.js'
import { init, initSymbol } from './shell/init.js'
import { library, librarySymbol } from './koorie/library.js'
import { logger, loggerSymbol } from './koorie/logger.js'
import { memory, memorySymbol } from './monitor/memory.js'
import { outgoing, outgoingSymbol } from './koorie/outgoing.js'
import { performance, performanceSymbol } from './shell/performance.js'
import { query, querySymbol } from './koorie/query.js'
import { read, readSymbol } from './koorie/library/read.js'
import { request, requestSymbol } from './koorie/request.js'
import { resource, resourceSymbol } from './koorie/resource.js'
import { routes, routesSymbol } from './koorie/routes.js'
import { routing, routingSymbol } from './koorie/routing.js'
import { server, serverSymbol } from './koorie/server.js'
import { set, setSymbol } from './shell/set.js'
import { socket, socketSymbol } from './koorie/socket.js'

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
export { default as cluster_types__ } from './koorie/fork/cluster_types.js'
export const api__ = api[ apiSymbol ]
export const body__ = body[ bodySymbol ]
export const fork__ = fork[ forkSymbol ]
export const request__ = request[ requestSymbol ]
export const library__ = library[ librarySymbol ]
export const read__ = read[ readSymbol ]
export const logger__ = logger[ loggerSymbol ]
export const hot__ = hot[ hotSymbol ]
export const outgoing__ = outgoing[ outgoingSymbol ]
export const query__ = query[ querySymbol ]
export const resource__ = resource[ resourceSymbol ]
export const routes__ = routes[ routesSymbol ]
export const routing__ = routing[ routingSymbol ]
export const server__ = server[ serverSymbol ]
export const set__ = set[ setSymbol ]
export const socket__ = socket[ socketSymbol ]

/**
 * Object [ shell ].
 *
 * @private
 */
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
export { default as library_flag__ } from './input/koorie/library_flag.js'
export { default as logger_flag__ } from './input/koorie/logger_flag.js'
export { default as middleware_flag__ } from './input/koorie/middleware_flag.js'
export { default as response_time_flag__ } from './input/koorie/response_time_flag.js'
export { default as socket_flag__ } from './input/koorie/socket_flag.js'

/**
 * - koorie-shell commands and flags.
 *
 * @private
 */
export { default as init_command__ } from './input/shell/init_command.js'

// - koorie.server properties
/**
 * Resolvers for oftypes undefined_ function.
 *
 * @param {{
 *      p:number,port:number,
 *      a:string,address:string,
 *      c:number,cluster:number,
 *      lb:string, library: string,
 *      l:boolean, logger:boolean,
 *      hot:undefined,
 *      d:string,domain:string,
 *      pr:string,protocol:string,
 *      s:string,static_files:string,
 *      false_flag:boolean|undefined,
 *      response_time:string,rt:string} |
 *      null} flags - Parsed arguments.
 * @returns {Promise<{false: ((function(): Promise<void>)|*), true: ((function(): Promise<void>)|*)}>}
 */
export async function server_resolvers( flags ){

    return server_resolvers__( flags )
}
