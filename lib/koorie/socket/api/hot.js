import { default as api } from '../api.js'
import cluster from 'node:cluster'

const hotSymbol = Symbol( 'Object [ koorie.socket.api.hot ]' )
const hot = Object.defineProperty( api, hotSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.socket.api.hot ]
     * it can set/unset, through socket, **hot wired**.
     *
     * @param {Socket} socket - socket client/server.
     * @param {string} switch_on - hot options :)
     * @returns {Promise<void>|void}
     */
    value: async function api_hot( socket, switch_on ) {

        process.env.HOT = switch_on

        for ( const worker in cluster.workers  )
            cluster.workers[ worker ].send( switch_on )

        let work = 'single || workers'.green()
        work += ' ➠ '.red()
        work += `pid = [${process.pid.toString().cyan()}]`
        work += ' received new option for **hot state**'.green()

        socket.write( `${work}${'\nthe options will be applied without reloading the server || workers. ⬇︎'.magenta()}\n` )
        socket.write( `${JSON.stringify( switch_on )}`.green() )
    }
} )

export default hot[ hotSymbol ]
