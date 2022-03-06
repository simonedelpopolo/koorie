import Answer from './extends/Promise/Answer.js'
import { server_resolvers__ } from './koorie/server/resolvers.js'
import { address_flag, address_flagSymbol } from './input/address_flag.js'
import { api, apiSymbol } from './koorie/socket/api.js'
import { body, bodySymbol } from './koorie/body.js'
import { cluster_flag, cluster_flagSymbol } from './input/cluster_flag.js'
import { entry_point, entry_pointSymbol } from './input/entry_point.js'
import { fork, forkSymbol } from './koorie/fork.js'
import { hot, hotSymbol } from './koorie/hot.js'
import { hot_flag, hot_flagSymbol } from './input/hot_flag.js'
import { init, initSymbol } from './shell/init.js'
import { init_command, init_commandSymbol } from './input/init_command.js'
import { library, librarySymbol } from './koorie/library.js'
import { library_flag, library_flagSymbol } from './input/library_flag.js'
import { logger, loggerSymbol } from './koorie/logger.js'
import { loggerFlag, loggerFlagSymbol } from './input/logger_flag.js'
import { memory, memorySymbol } from './monitor/memory.js'
import { options, optionsSymbol } from './input/options.js'
import { outgoing, outgoingSymbol } from './koorie/outgoing.js'
import { performance, performanceSymbol } from './shell/performance.js'
import { process_title, process_titleSymbol } from './input/process_title.js'
import { processor, processorSymbol } from './input/processor.js'
import { query, querySymbol } from './koorie/query.js'
import { read, readSymbol } from './koorie/library/read.js'
import { request, requestSymbol } from './koorie/request.js'
import { resource, resourceSymbol } from './koorie/resource.js'
import { response_time, response_timeSymbol } from './input/response_time.js'
import { route, routeSymbol } from './shell/route.js'
import { routes, routesSymbol } from './koorie/routes.js'
import { routing, routingSymbol } from './koorie/routing.js'
import { server, serverSymbol } from './koorie/server.js'
import { set, setSymbol } from './shell/set.js'
import { shell_exit_codes, shellExitCodesSymbol } from './errors/shell.js'
import { socket, socketSymbol } from './koorie/socket.js'
import { socket_flag, socket_flagSymbol } from './input/socket_flag.js'



// - extends
await import( './extends/String/conversion/toBuffer.js' )
await import( './extends/String/conversion/toNumber.js' )
// - stdout text decoration
await import( './extends/String/decoration/strong.js' )
await import( './extends/String/decoration/underline.js' )
// - stdout text colors
await import( './extends/String/color/fg/color.js' )
await import( './extends/String/color/fg/black.js' )
await import( './extends/String/color/fg/cyan.js' )
await import( './extends/String/color/fg/green.js' )
await import( './extends/String/color/fg/magenta.js' )
await import( './extends/String/color/fg/red.js' )
await import( './extends/String/color/fg/white.js' )
await import( './extends/String/color/fg/yellow.js' )
// - stdout background colors
await import( './extends/String/color/bg/color.js' )
await import( './extends/String/color/bg/black.js' )
await import( './extends/String/color/bg/cyan.js' )
await import( './extends/String/color/bg/green.js' )
await import( './extends/String/color/bg/magenta.js' )
await import( './extends/String/color/bg/red.js' )
await import( './extends/String/color/bg/white.js' )
await import( './extends/String/color/bg/yellow.js' )

export const Answer__ = Answer

/**
 * Object [ activity ]
 *
 * @private
 */
export { default as exit__ } from './activity/exit.js'
export { default as stderr__ } from './activity/stderr.js'
export { default as exit_types__ } from './activity/exit/types.js'

/**
 * Object [ config ]
 *
 * @private
 */
export { default as parser__ } from './config/parser.js'

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
export const route__ = route[ routeSymbol ]
export const performance__ = performance[ performanceSymbol ]

/**
 * Object [ input ].
 *
 * @private
 */
export const entry_point__ = entry_point[ entry_pointSymbol ]
export const process_title__ = process_title[ process_titleSymbol ]
export const processor__ = processor[ processorSymbol ]
export const options__ = options[ optionsSymbol ]

// Koorie flags
const address_flag__ = address_flag[ address_flagSymbol ]
export const address_flag_get = address_flag__.get

const cluster_flag__ = cluster_flag[ cluster_flagSymbol ]
export const cluster_flag_get = cluster_flag__.get
export const cluster_flag_run = cluster_flag__.run

const library_flag__ = library_flag[ library_flagSymbol ]
export const library_flag_get = library_flag__.get

const logger_flag__ = loggerFlag[ loggerFlagSymbol ]
export const logger_flag_get = logger_flag__.get

const hot_flag__ = hot_flag[ hot_flagSymbol ]
export const hot_flag_get = hot_flag__.get

const response_time_flag__ = response_time[ response_timeSymbol ]
export const response_time_flag_get = response_time_flag__.get

const socket_flag__ = socket_flag[ socket_flagSymbol ]
export const socket_flag_get = socket_flag__.get

// Koorie-Shell commands and flags

const shell_init = init_command[ init_commandSymbol ]
export const init_command_get = shell_init.get

/**
 * Object [ errors ].
 *
 * @private
 */
export const shell_exit_codes__ = shell_exit_codes[ shellExitCodesSymbol ]

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
