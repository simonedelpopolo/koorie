import { cluster_ as c, clusterSymbol } from './cluster.js'
import { logger as l, loggerSymbol } from './logger.js'
import { routingSymbol, routing as ru } from './routing.js'
import { server as s, serverSymbol } from './server.js'
import { status, status_Symbol } from './status.js'

export const status200 = status[ status_Symbol ][ '200' ]
export const status404 = status[ status_Symbol ][ '404' ]

export const routing__ = ru[ routingSymbol ]
export const cluster__ = c[ clusterSymbol ]
export const logger__ = l[ loggerSymbol ]
export const server = s[ serverSymbol ]
