import cluster from 'cluster'
import { http_request } from './server/functions/http_request.js'
import { https_request } from './server/functions/https_request.js'
import { listen_text } from './initialize/text/listen.js'
import { rm_socket_file } from './initialize/functions/rm_socket_file.js'
import { true_false } from 'boolean-jokes'
import { default as worker_socket } from './socket.js'
import { workers_info_text } from './initialize/text/workers_info.js'
import { dispatcher, http, https, socket } from '../../index.js'

/**
 * Server.
 *
 * @returns {Promise<void>}
 */
export async function initialize() {

    const { PORT, ADDRESS, SOCKET_ACTIVE, SOCKET_PATH, SECURE, SECURE_KEY, SECURE_CERT, SECURE_DHPARAM } = process.env

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

    let first_request
    first_request = secure_active === true

        ? https_request()
        : http_request()

    server.on( 'request', dispatcher )

    server.listen( intPort, ADDRESS, null,
        () => {
            const { port, family, address } = server.address()
            const server_info = {
                address: address,
                family: family,
                port: port
            }

            if( cluster.isWorker ) {

                server_info.worker = { id:cluster.worker.id, pid:cluster.worker.process.pid }
                process.stdout.write( workers_info_text( server_info ) )

            }

            if( !cluster.isWorker ) {
                console.log( listen_text() )
                console.log( '----------------------------------------------------'.green() )
                console.log( server_info )
            }

            process.env.FIRST = 'true'

            setTimeout( () => {
                const options = {
                    hostname: `${process.env.ADDRESS}`,
                    path: '/?first=true',
                    port: intPort,
                    method: 'GET',
                    protocol: `${process.env.PROTOCOL}:`,
                    rejectUnauthorized: false,
                    requestCert: true,
                    agent: false
                }

                const req = first_request( options, () => process.env.FIRST = 'false' )

                req.on( 'error', ( e ) => {
                    console.error( `problem with request: ${e.message}` )
                } )

                req.end()
            }, 100 )

        } )

    if( socket_active ) {
        if( ! cluster.isWorker )
            await socket( { path: socket_path } )
        else
            worker_socket( { path: socket_path } )
    }

    process.on( 'SIGINT', () => rm_socket_file( process.env.SOCKET_PATH ) )
}

if ( cluster.isWorker )
    await initialize()
