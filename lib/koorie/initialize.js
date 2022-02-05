import cluster from 'cluster'
import { createServer } from 'http'
import { domain, outgoing, protocol, routing } from '../../whisk.js'

export const worker = {
    id: null,
    date: null
}

/**
 * Server.
 *
 * @returns {Promise<void>}
 */
export async function initialize() {
    
    const { port, address, static_files } = process.env
    
    /**
     * @type {number}
     */
    let intPort
    if( port === 'null' )
        intPort = 0
    else
        intPort = parseInt( port )
    
    // The server configuration
    const server = createServer(  async ( Incoming, Outgoing ) => {
        
        worker.id = cluster.isWorker === true ? `_rd-app-worker-id:${ cluster.worker.id }` : 'single'
        worker.date = new Date()
        
        await routing( {
            requested_resource:`${ static_files }${ Incoming.url }`,
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
    
    server.listen( intPort, address, null,
        async () => {
            let serverInfo = server.address()
            console.log( serverInfo )
            console.log( `${await protocol.get()}${ await domain.get() }:${ serverInfo.port }` )
        } )
    
    process.on( 'SIGINT', () => {
        process.stdout.write( '\r \x1b[31m:(\x1b[89m' )
        process.exit( 0 )
    } )
}

if ( cluster.isWorker )
    await initialize()



