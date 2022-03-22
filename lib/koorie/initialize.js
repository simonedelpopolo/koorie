import cluster from 'cluster'
import { listen_text } from './initialize/text/listen.js'
import { randomUUID } from 'crypto'
import { rm_socket_file } from './initialize/functions/rm_socket_file.js'
import { true_false } from 'boolean-jokes'
import { default as worker_socket } from './socket.js'
import { http, https, outgoing, routing, socket } from '../../index.js'

export const worker = {
    id: null,
    date: null
}

export const request_timing = 'request ID -> '
export let request_id
export let time_
export let number_of_connections = 0

/**
 * Server.
 *
 * @returns {Promise<void>}
 */
export async function initialize() {

    const { PORT, ADDRESS, STATIC_FILES, SOCKET_ACTIVE, SOCKET_PATH, SECURE, SECURE_KEY, SECURE_CERT, SECURE_DHPARAM } = process.env

    const secure_active = await true_false( SECURE )
    const secure_dhparam = SECURE_DHPARAM === 'null' ? null : `${process.cwd()}/${SECURE_DHPARAM}`
    const socket_active = await true_false( SOCKET_ACTIVE )
    const socket_path = SOCKET_PATH

    /**
     * @type {number}
     */
    let intPort = parseInt( PORT )

    // The server configuration
    const server = secure_active === true
        ? await https( `${process.cwd()}/${SECURE_KEY}`, `${process.cwd()}/${SECURE_CERT}`, secure_dhparam )
        : await http()

    server.on( 'request', async ( Incoming, Outgoing ) => {

        number_of_connections++
        request_id = randomUUID()
        time_ = process.hrtime.bigint()

        worker.id = cluster.isWorker === true
            ? `_koorie-worker-id:${ cluster.worker.id }(process.pid -> ${cluster.worker.process.pid})`
            : `single(process.pid -> ${process.pid})`

        worker.date = new Date()

        await routing( {
            requested_resource:`${ STATIC_FILES }${ Incoming.url }`,
            server: {
                outgoing: Outgoing,
                incoming:Incoming
            }
        } )
            .then( async response => {

                await outgoing( response, Outgoing )
            } )
            .catch( async error => {
                await outgoing( error, Outgoing )
            } )
    } )

    server.listen( intPort, ADDRESS, null,
        () => {
            const { port, family, address } = server.address()
            const server_info = `{ address: '${ address.green() }', family: '${ family.green() }', port: ${ port.toString().yellow() } }\n`

            if( cluster.isWorker )
                process.stdout.write( server_info )
            if( !cluster.isWorker )
                console.log( listen_text() )
        } )

    if( socket_active ) {
        if( ! cluster.isWorker )
            await socket( { path: socket_path } )
        else
            worker_socket( { path: socket_path } )
    }

    process.on( 'SIGINT', () => rm_socket_file( process.env.SOCKET_PATH, process.pid ) )
}

if ( cluster.isWorker )
    await initialize()
