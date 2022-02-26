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
     * @returns {
     *   Promise<{[unknown]:string, [p:string]:NodeJS.MemoryUsage}> |
     *   {unknown: string, [p: string]: NodeJS.MemoryUsage}
     *   }
     */
    // eslint-disable-next-line no-unused-vars
    value: async function memory() {
        
        const MemoryUsage = process.memoryUsage()
        
        return {
            'process.title': process.title,
            [ `${process.title} - memory` ]: {
                rss: `${ Math.round( ( MemoryUsage.rss / 1024 / 1024 ) * 100 ) / 100 } MB`,
                arrayBuffers: `${ Math.round( ( MemoryUsage.arrayBuffers / 1024 / 1024 ) * 100 ) / 100 } MB`,
                external: `${ Math.round( ( MemoryUsage.external / 1024 / 1024 ) * 100 ) / 100 } MB`,
                heapTotal: `${ Math.round( ( MemoryUsage.heapTotal / 1024 / 1024 ) * 100 ) / 100 } MB`,
                heapUsage: `${ Math.round( ( MemoryUsage.heapUsed / 1024 / 1024 ) * 100 ) / 100 } MB`
            },
        }
    }
} )
