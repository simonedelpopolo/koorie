import { default as api } from '../api.js'
import { memory as monitor_memory } from '../../../../index.js'

const memorySymbol = Symbol( 'Object [ koorie.socket.api.memory ]' )
const memory = Object.defineProperty( api, memorySymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * API memory.
     *
     * @param {Socket} socket_ - .
     * @returns {Promise<{[unknown]:string, [p:string]:NodeJS.MemoryUsage}> | {unknown: string, [p: string]: NodeJS.MemoryUsage}}
     */
    value: async function memory( socket_ ) {
        socket_.write( JSON.stringify( await monitor_memory() ) )
    }
} )

export default memory[ memorySymbol ]
