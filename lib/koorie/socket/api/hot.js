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
     * @param {Socket} socket_ - .
     * @param {{[p:string]:any}} opts - .
     * @returns {Promise<void>}
     */
    value: async function hot( socket_, opts ) {
        if( !cluster.isWorker ) {
            process.env.HOT = opts.HOT

            let work = 'single instance'.green()
            work += ' ➠ '.red()
            work += `pid = [${process.pid.toString().cyan()}]`
            work += ' received new set of options'.green()

            socket_.write( `${work}${'\nthe options will be applied without reloading the server ⬇︎'.magenta()}\n` )
            socket_.write( `${JSON.stringify( opts )}`.green() )
        }

        else if( cluster.isWorker ) {
            process.env.HOT = opts.HOT
            process.send( { options: { HOT: opts.HOT } } )
        }
    }
} )

export default hot[ hotSymbol ]
