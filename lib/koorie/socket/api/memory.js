import { default as api } from '../api.js'
import { memory as monitor_memory } from '../../../../index.js'

const memorySymbol = Symbol( 'Object [ koorie.socket.api.memory ]' )
const memory = Object.defineProperty( api, memorySymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.socket.api.memory ]
     * it streams, through socket, the MemoryUsage of the Primary Process
     * It doesn't take in account the Workers in **forked state**.
     *
     * @param {Socket} socket - client/server.
     * @returns {Promise<{[unknown]:string, [p:string]:NodeJS.MemoryUsage}> | {unknown: string, [p: string]: NodeJS.MemoryUsage}}
     */
    value: async function api_memory( socket ) {
        socket.write( JSON.stringify( monitor_memory() ) )
    }
} )

export default memory[ memorySymbol ]
