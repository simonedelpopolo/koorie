/**
 * Get the memory usage statistic of the application.
 *
 * @returns {{unknown: string, [p: string]: NodeJS.MemoryUsage}}
 */
export default function memory() {

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
