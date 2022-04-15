import cluster from 'cluster'
import { listen_text } from './initialize/text/listen.js'
import { override } from '@cli-blaze/decors'
import { rm_socket_file } from './initialize/functions/rm_socket_file.js'
import { true_false } from 'boolean-jokes'
import { workers_info_text } from './initialize/text/workers_info.js'
import { dispatcher, http, http2, https, socket } from '../../index.js'

export const koorie_log_writer_pid = {
    pid: null
}

/**
 * Object [ koorie.initialize ]
 * here the server begun its life cycle.
 *
 * @returns { Promise<void>|void }
 */
export async function initialize() {

    const { PORT, ADDRESS, HTTP2, SECURE, SECURE_KEY, SECURE_CERT, SECURE_DHPARAM, SOCKET_ACTIVE, SOCKET_PATH } = process.env

    const http2_active = await true_false( HTTP2 )
    const secure_active = await true_false( SECURE )
    const secure_dhparam = SECURE_DHPARAM === 'null' ? null : `${process.cwd()}/${SECURE_DHPARAM}`
    const socket_active = await true_false( SOCKET_ACTIVE )
    const socket_path = SOCKET_PATH

    /**
     * @type {number}
     */
    let intPort = parseInt( PORT )

    // Server instance
    let server
    if( http2_active ) server = await http2( `${process.cwd()}/${SECURE_KEY}`, `${process.cwd()}/${SECURE_CERT}`, secure_dhparam )
    else {
        server = secure_active === true
            ? await https( `${ process.cwd() }/${ SECURE_KEY }`, `${ process.cwd() }/${ SECURE_CERT }`, secure_dhparam )
            : await http()
    }

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
        } )

    // - todo at this stage only **hot wired** can be set/unset
    // - todo it will be required to create a switch between options to be set/unset
    if( cluster.isWorker )
        cluster.worker.on( 'message', async message => cluster.worker.process.env.HOT = message )

    // - only PrimaryProcess.
    if( socket_active && ! cluster.isWorker ) await socket( { path: socket_path } )

    process.on( 'SIGINT', () => {
        if( process.env.EXPERIMENTAL_LOG_WRITER )
            process.kill( koorie_log_writer_pid.pid || parseInt( process.env.EXPERIMENTAL_LOG_WRITER_PID ) )

        rm_socket_file( process.env.SOCKET_PATH )
    } )
}

if ( cluster.isWorker ) {
    // - import the cli-decors **forked state**
    override()
    process.nextTick( initialize )
}
