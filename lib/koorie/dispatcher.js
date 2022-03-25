import cluster from 'cluster'
import koorie from '../koorie.js'
import { randomUUID } from 'crypto'
import { outgoing, routing } from '../../index.js'

export const worker = {
    id: null,
    date: null
}

export const request_timing = 'request ID -> '
export let request_id = false
export let time_ = false
export let number_of_connections = 0

const dispatcherSymbol = Symbol( 'Object [ koorie.dispatcher ]' )
const dispatcher = Object.defineProperty( koorie, dispatcherSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.dispatcher ]
     * ServerRequest event listener.
     *
     * @param {IncomingMessage} Incoming - server request
     * @param {ServerResponse} Outgoing - server response
     * @returns {Promise<void>}
     */
    value: async function dispatcher( Incoming, Outgoing ) {

        if( process.env.SILENCED !== 'true' && process.env.FIRST !== 'true' ) {
            number_of_connections++
            request_id = randomUUID()
            time_ = process.hrtime.bigint()

            worker.id = cluster.isWorker === true
                ? `_koorie-worker-id:${ cluster.worker.id }(process.pid -> ${ cluster.worker.process.pid })`
                : `single(process.pid -> ${ process.pid })`

            worker.date = new Date()
        }

        const response = await routing( Incoming, Outgoing )
            .catch( async error => error )

        await outgoing( response, Outgoing )
    }
} )

export default dispatcher[ dispatcherSymbol ]
