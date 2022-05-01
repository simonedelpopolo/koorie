import cluster from 'cluster'
import { randomUUID } from 'crypto'
import { outgoing, routing } from '../../private.js'

export const worker = {
    id: null,
    date: null
}

export const request_timing = 'request ID -> '
export let request_id = false
export let time_ = false
export let number_of_connections = 0

/**
 * Object [ koorie.dispatcher ]
 * ServerRequest event listener.
 *
 * @param {IncomingMessage|Http2ServerRequest} Incoming - server request
 * @param {ServerResponse} Outgoing - server response
 * @returns {Promise<void>}
 */
export default async function dispatcher( Incoming, Outgoing ) {

    number_of_connections++
    request_id = randomUUID()
    time_ = process.hrtime.bigint()

    worker.id = cluster.isWorker === true
        ? `_koorie-worker-id:${ cluster.worker.id }(process.pid -> ${ cluster.worker.process.pid })`
        : `single(process.pid -> ${ process.pid })`

    worker.date = new Date()

    const response = await routing( Incoming, Outgoing ).catch( error => error )
    await outgoing( response, Outgoing )
}
