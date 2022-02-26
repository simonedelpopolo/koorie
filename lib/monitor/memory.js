import monitor from '../monitor.js'

export const memorySymbol = Symbol( 'Object [ monitoring.memory ] memory usage statistics' )
export const memory = Object.defineProperty( monitor, memorySymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Get the memory usage statistic of the application.
     * Require a socket connection.
     *
     * @param {number=} refresh_rate - specify the refresh rate in milliseconds
     * @returns {Promise<{[process.title]:string, [p:string]:NodeJS.MemoryUsage}>}
     */
    // eslint-disable-next-line no-unused-vars
    value: async function memory( refresh_rate= 1_000 ) {
        
        return {
            'process.title': process.title,
            [ `${process.title} - memory` ]: process.memoryUsage()
        }
    }
} )
