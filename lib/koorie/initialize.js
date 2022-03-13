import cluster from 'cluster'
import { randomUUID } from 'crypto'
import { true_false } from 'boolean-jokes'
import { default as worker_socket } from './socket.js'
import { access, rm } from 'node:fs/promises'
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
        async () => {

            const { port, family, address } = server.address()
            let server_info
            let browser_url

            if( ! cluster.isWorker ) {
                server_info = `{ address: '${ address.green() }', family: '${ family.green() }', port: ${ port.toString().yellow() } }\n`
                process.stdout.write( server_info )
            }
            else
                console.log( server.address() )

            browser_url = 'koorie your browser here ⬇︎ \n '
            browser_url += `${process.env.PROTOCOL}://${process.env.ADDRESS}`
            browser_url += `:${port.toString()}\n`
            browser_url += '----------------------------------------------------\n'

            process.stdout.write( browser_url )
        } )

    if( socket_active ) {
        if( ! cluster.isWorker )
            await socket( { path: socket_path } )
        else
            worker_socket( { path: socket_path } )
    }

    process.on( 'SIGINT', async () => {

        console.log( '\r:('.red() )
        const error = await access( socket_path ).catch( error => error )
        if( !( error instanceof Error ) ) {
            await rm( `${ socket_path }` )

            process.kill( process.pid, 'SIGKILL' )
        }

        else
            process.kill( process.pid, 'SIGKILL' )

    } )
}

if ( cluster.isWorker )
    await initialize()
