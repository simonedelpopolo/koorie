import cluster from 'cluster'
import { createServer } from 'http'
import { randomUUID } from 'crypto'
import { true_false } from 'boolean-jokes'
import { outgoing, routing } from '../../index.js'

export const worker = {
    id: null,
    date: null
}

export const request_timing = '\u001b[42;1mresponse ID -> \u001b[0m'
export let request_id
export let time_
/**
 * Server.
 *
 * @returns {Promise<void>}
 */
export async function initialize() {
    
    const { PORT, ADDRESS, STATIC_FILES, RESPONSE_TIME } = process.env
    
    /**
     * @type {number}
     */
    let intPort = parseInt( PORT )
    
    // The server configuration
    const server = createServer(  async ( Incoming, Outgoing ) => {
        
        if( await true_false( RESPONSE_TIME ) === true ) {
            request_id = randomUUID()
            time_ = process.hrtime.bigint()
        }

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



