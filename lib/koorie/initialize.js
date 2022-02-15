import cluster from 'cluster'
import { createServer } from 'http'
import { randomUUID } from 'crypto'
import { outgoing, routing } from '../../index.js'

export const worker = {
    id: null,
    date: null
}

export const request_timing = '\u001b[1m\u001b[4m\u001b[42;1mresponse ID -> \u001b[0m'
export let request_id

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
    
        request_id = `\u001b[1m\u001b[4m\u001b[44;1m ${randomUUID()}\u001b[0m`
        console.time( request_timing + request_id )

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
            console.log( server.address() )
        } )
    
    process.on( 'SIGINT', () => {
        process.stdout.write( '\r \x1b[31m:(\x1b[89m\x1b[0m\n' )
        process.exit( 0 )
    } )
}

if ( cluster.isWorker )
    await initialize()



