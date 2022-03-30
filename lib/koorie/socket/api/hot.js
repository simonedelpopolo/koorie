import { default as api } from '../api.js'
import cluster from 'node:cluster'

const hotSymbol = Symbol( 'Object [ koorie.socket.api.hot ]' )
const hot = Object.defineProperty( api, hotSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * API hot.
     *
     * @param {Socket} socket_ - socket client/server.
     * @param {{HOT:string}} options - .
     * @returns {Promise<void>}
     */
    value: async function hot( socket_, options ) {

        // Single instance.
        if( !cluster.isWorker ) {
            process.env.HOT = options.HOT

            let work = 'single instance'.green()
            work += ' ➠ '.red()
            work += `pid = [${process.pid.toString().cyan()}]`
            work += ' received new set of options'.green()

            socket_.write( `${work}${'\nthe options will be applied without reloading the server ⬇︎'.magenta()}\n` )
            socket_.write( `${JSON.stringify( options )}`.green() )
        }

        else if( cluster.isWorker )
            process.send( { HOT: options.HOT } )

    }
} )

export default hot[ hotSymbol ]
