import { createServer } from 'node:http'
import { server, serverSymbol } from '../server.js'

const httpSymbol = Symbol( 'Object [ koorie.server.http ]' )
const http = Object.defineProperty( server[ serverSymbol ], httpSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.server.http ].
     *
     * @returns {Promise<Server> | Server}
     */
    value: async function http() {
        return createServer()
    }
} )

export default http[ httpSymbol ]
