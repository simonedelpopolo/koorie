// eslint-disable-next-line capitalized-comments
// noinspection JSCheckFunctionSignatures

import cluster from 'cluster'
import { createServer } from 'http'
import { dispatcher, routing } from '../../index.js'
import { resource, resourceSymbol } from './resource.js'

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
    
    // The server configuration
    const server = createServer(  async ( Incoming, Outgoing ) => {
        
        resource[ resourceSymbol ] = static_files
        
        await dispatcher( {
            requested_resource:`${ resource[ resourceSymbol ] }${ Incoming.url }`,
            server: {
                outgoing: Outgoing,
                incoming:Incoming
            }
        } ).then( response => {
            
            routing( response, Incoming, Outgoing )
        } )
            .catch( error => {
                routing( error )
            } )
        
        worker.id = cluster.isWorker === true ? `_rd-app-worker-id:${ cluster.worker.id }` : 'single'
        worker.date = new Date()
    } )
    
    server.listen( parseInt( port ), address, null,
        () => {
            console.log( server.address() )
            console.log( `http://${ server.address().address }:${ server.address().port }` )
        } )
    
}

if ( cluster.isWorker )
    await initialize()



