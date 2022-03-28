import cluster from 'cluster'
import { listen_text } from './initialize/text/listen.js'
import { on_listening_check_request } from './initialize/functions/on_listening_check_request.js'
import { rm_socket_file } from './initialize/functions/rm_socket_file.js'
import { true_false } from 'boolean-jokes'
import { default as worker_socket } from './socket.js'
import { workers_info_text } from './initialize/text/workers_info.js'
import { dispatcher, http, https, socket } from '../../index.js'

export const koorie_log_write_pid = {
    pid: null
}

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

            setTimeout( async () => {
                if( process.env.ON_LISTENING_CHECK_REQUEST )
                    await on_listening_check_request()
            }, 1000 )

        } )

    if( socket_active ) {
        if( ! cluster.isWorker )
            await socket( { path: socket_path } )
        else
            worker_socket( { path: socket_path } )
    }

    process.on( 'SIGINT', () => {
        if( process.env.EXPERIMENTAL_LOG_WRITER )
            process.kill( koorie_log_write_pid.pid || process.env.EXPERIMENTAL_LOG_WRITER_PID.toNumber() )

        rm_socket_file( process.env.SOCKET_PATH )
    } )
}

if ( cluster.isWorker )
    await initialize()
