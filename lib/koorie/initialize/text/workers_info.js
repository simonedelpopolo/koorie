/**
 * The server.listen() message for workers info.
 *
 * @param {Object} server_info - object with server info and worker info.
 * @returns {string}
 */
export function workers_info_text( server_info ){
    const { port, family, address, worker } = server_info

    return `{ address: '${ address.green() }', family: '${ family.green() }', port: ${ port.toString().yellow() }, worker: {id: ${worker.id.toString().green().strong()}, pid: ${worker.pid.toString().red().strong()}} }\n`
}
