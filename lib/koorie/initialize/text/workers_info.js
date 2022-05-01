import { Blaze } from '@cli-blaze/decors'

/**
 * The server.listen() message for workers info.
 *
 * @param {Object} server_info - object with server info and worker info.
 * @returns {string}
 */
export function workers_info_text( server_info ){
    const { port, family, address, worker } = server_info

    return `{ address: '${ Blaze.green( address ) }', family: '${ Blaze.green( family ) }', port: ${ Blaze.yellow( port.toString() ) }, worker: {id: ${Blaze.strong( Blaze.green( worker.id.toString() ) )}, pid: ${Blaze.strong( Blaze.red( worker.pid.toString() ) )}} }\n`
}
