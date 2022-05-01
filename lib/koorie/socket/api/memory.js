import { memory as monitor_memory } from '../../../../private.js'

/**
 * Object [ koorie.socket.api.memory ]
 * it streams, through socket, the MemoryUsage of the Primary Process
 * It doesn't take in account the Workers in **forked state**.
 *
 * @param {Socket} socket - client/server.
 * @returns {Promise<{[unknown]:string, [p:string]:NodeJS.MemoryUsage}> | {unknown: string, [p: string]: NodeJS.MemoryUsage}}
 */
export default async function api_memory( socket ) {
    socket.write( JSON.stringify( monitor_memory() ) )
}
