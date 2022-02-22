import { address_flag, address_flagSymbol } from './input/address_flag.js'
import { body, bodySymbol } from './koorie/body.js'
import { cluster_flag, cluster_flagSymbol } from './input/cluster_flag.js'
import { domain, domainSymbol } from './koorie/domain.js'
import { domain_flag, domain_flagSymbol } from './input/domain_flag.js'
import { entry_point, entry_pointSymbol } from './input/entry_point.js'
import { exit, exitSymbol } from './activity/exit.js'
import { fork, forkSymbol } from './koorie/fork.js'
import { hot, hotSymbol } from './koorie/hot.js'
import { hot_flag, hot_flagSymbol } from './input/hot_flag.js'
import { incoming, incomingSymbol } from './koorie/incoming.js'
import { init, initSymbol } from './shell/init.js'
import { init_command, init_commandSymbol } from './input/init_command.js'
import { library, librarySymbol } from './koorie/library.js'
import { library_flag, library_flagSymbol } from './input/library_flag.js'
import { logger, loggerSymbol } from './koorie/logger.js'
import { loggerFlag, loggerFlagSymbol } from './input/logger_flag.js'
import { outgoing, outgoingSymbol } from './koorie/outgoing.js'
import { parser, parserSymbol } from './config/parser.js'
import { process_title, process_titleSymbol } from './input/process_title.js'
import { protocol, protocolSymbol } from './koorie/protocol.js'
import { query, querySymbol } from './koorie/query.js'
import { read, readSymbol } from './koorie/library/read.js'
import { resource, resourceSymbol } from './koorie/resource.js'
import { response_time, response_timeSymbol } from './input/response_time.js'
import { route, routeSymbol } from './shell/route.js'
import { routes, routesSymbol } from './koorie/routes.js'
import { routing, routingSymbol } from './koorie/routing.js'
import { server, serverSymbol } from './koorie/server.js'
import { shell_exit_codes, shellExitCodesSymbol } from './errors/shell.js'
import { stderr, stderrSymbol } from './activity/stderr.js'

// - extends
await import( './extends/String/toBuffer.js' )
await import( './extends/String/toNumber.js' )
await import( './extends/String/red.js' )
await import( './extends/String/green.js' )
await import( './extends/String/strong.js' )
await import( './extends/String/underline.js' )

/**
 * Object [ activity ].
 *
 * @private
 */
export const process_exit__ = exit[ exitSymbol ]
export const stderr__ = stderr[ stderrSymbol ]

/**
 * Object [ koorie ].
 *
 * @private
 */
export const body__ = body[ bodySymbol ]
export const domain__ = domain[ domainSymbol ]
export const fork__ = fork[ forkSymbol ]
export const incoming__ = incoming[ incomingSymbol ]
export const library__ = library[ librarySymbol ]
export const read__ = read[ readSymbol ]
export const logger__ = logger[ loggerSymbol ]
export const hot__ = hot[ hotSymbol ]
export const outgoing__ = outgoing[ outgoingSymbol ]
export const protocol__ = protocol[ protocolSymbol ]
export const query__ = query[ querySymbol ]
export const resource__ = resource[ resourceSymbol ]
export const routes__ = routes[ routesSymbol ]
export const routing__ = routing[ routingSymbol ]
export const server__ = server[ serverSymbol ]

/**
 * Object [ shell ].
 *
 * @private
 */
export const init__ = init[ initSymbol ]
export const route__ = route[ routeSymbol ]

/**
 * Object [ input ].
 *
 * @private
 */
// Koorie flags
const address_flag__ = address_flag[ address_flagSymbol ]
export const address_flag_get = address_flag__.get

const cluster_flag__ = cluster_flag[ cluster_flagSymbol ]
export const cluster_flag_get = cluster_flag__.get
export const cluster_flag_run = cluster_flag__.run

const domain_flag__ = domain_flag[ domain_flagSymbol ]
export const domain_flag_get = domain_flag__.get

const library_flag__ = library_flag[ library_flagSymbol ]
export const library_flag_get = library_flag__.get

const logger_flag__ = loggerFlag[ loggerFlagSymbol ]
export const logger_flag_get = logger_flag__.get

const hot_flag__ = hot_flag[ hot_flagSymbol ]
export const hot_flag_get = hot_flag__.get

const response_time_flag__ = response_time[ response_timeSymbol ]
export const response_time_flag_get = response_time_flag__.get

// Koorie-Shell commands and flags

const shell_init = init_command[ init_commandSymbol ]
export const init_command_get = shell_init.get

export const process_title__ = process_title[ process_titleSymbol ]
export const entry_point__ = entry_point[ entry_pointSymbol ]

/**
 * Object [ errors ].
 *
 * @private
 */
export const shell_exit_codes__ = shell_exit_codes[ shellExitCodesSymbol ]

/**
 * Object [ config ].
 *
 * @private
 */
export const parser__ = parser[ parserSymbol ]
