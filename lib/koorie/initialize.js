import cluster from 'cluster'
import { createServer } from 'http'
import { randomUUID } from 'crypto'
import { outgoing, routing } from '../../index.js'

export const worker = {
    id: null,
    date: null
}

export const request_timing = 'request ID -> '
export let request_id
export let time_
export let number_of_connections = 0

/**
 * Server.
 *
 * @returns {Promise<void>}
 */
export async function initialize() {
    
    const { PORT, ADDRESS, STATIC_FILES } = process.env
    
    /**
     * @type {number}
     */
    let intPort = parseInt( PORT )
    
    // The server configuration
    const server = createServer(  async ( Incoming, Outgoing ) => {
    
        number_of_connections++
        request_id = randomUUID()
        time_ = process.hrtime.bigint()

        worker.id = cluster.isWorker === true
            ? `_koorie-worker-id:${ cluster.worker.id }(process.pid -> ${cluster.worker.process.pid})`
            : `single(process.pid -> ${process.pid})`
        
        worker.date = new Date()
        
        await routing( {
            requested_resource:`${ STATIC_FILES }${ Incoming.url }`,
            server: {
                outgoing: Outgoing,
                incoming:Incoming
            }
        } )
            .then( async response => {
            
                await outgoing( response, Outgoing )
            } )
            .catch( async error => {
                await outgoing( error, Outgoing )
            } )
    } )
    
    server.listen( intPort, ADDRESS, null,
        async () => {
    
            const { port, family, address } = server.address()
            let server_info
            let browser_url
            
            server_info = `{ address: '${address.green()}', family: '${family.green()}', port: ${port.toString().yellow()} }\n`
            
            browser_url = 'koorie your browser here ⬇︎ \n '
            browser_url += `${process.env.PROTOCOL}://${process.env.ADDRESS}`
            browser_url += `:${port.toString()}\n`
            browser_url += '----------------------------------------------------\n'
    
            process.stdout.write( server_info )
            process.stdout.write( browser_url )
        } )
    
    process.on( 'SIGINT', () => {
        process.stdout.write( '\r \x1b[31m:(\x1b[89m\x1b[0m\n' )
        process.exit( 0 )
    } )
}

if ( cluster.isWorker )
    await initialize()



