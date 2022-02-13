import cluster from 'cluster'
import { createServer } from 'http'
import { domain, outgoing, protocol, routing } from '../../index.js'

export const worker = {
    id: null,
    date: null
}

export const request_timing = '\u001b[1m\u001b[4m\u001b[42;1mresponse sent:\u001b[0m'

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
    
        console.time( 'request' )
        
        worker.id = cluster.isWorker === true ? `_rd-app-worker-id:${ cluster.worker.id }` : 'single'
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
            let serverInfo = server.address()
            console.log( serverInfo )
            console.log( `${await protocol.get()}${ await domain.get() }:${ serverInfo.port }` )
        } )
    
    process.on( 'SIGINT', () => {
        process.stdout.write( '\r \x1b[31m:(\x1b[89m\x1b[0m\n' )
        process.exit( 0 )
    } )
}

if ( cluster.isWorker )
    await initialize()



