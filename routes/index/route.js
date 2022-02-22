import Answer from '../../lib/extends/Promise/Answer.js'
import { undefined_ } from 'oftypes'

/**
 * Route - Index.
 *
 * @param {IncomingMessage} incoming - The given IncomingMessage Object.
 * @param {ServerResponse} outgoing - The given ServerResponse Object.
 * @returns {Promise | PromiseFulfilledResult<{buffer:Buffer}> | PromiseRejectedResult<Buffer>}
 */
export async function index( incoming, outgoing ){

    if( incoming.method === 'POST' ){
        let message = await Answer.koorie().post( 'index', await Answer.koorie().body_ )
        
        if( await undefined_( message.invalid ) === true ){
            
            return new Answer( ( good ) => {
                
                outgoing.statusCode = 200
                outgoing.setHeader( 'content-type', 'application/json' )
                outgoing.setHeader( 'koorie-api', 'true' )
                outgoing.statusMessage = 'Ok'
                
                const outgoingBuffer = Buffer.from( JSON.stringify( { receiver: 'oK' } ) )
                const incomingBuffer = Buffer.from( JSON.stringify( message ) )
                
                const responseMessage = {
                    buffer: outgoingBuffer,
                    incoming:{
                        length: Buffer.byteLength( incomingBuffer ),
                        payload: incomingBuffer
                    }
                }
                good( responseMessage )
            } )
        }
    }
    
    return new Answer( ( good, bad ) => {
        
        if( incoming.method === 'GET' ) {
            
            outgoing.statusCode = 200
            outgoing.statusMessage = 'Ok'
            outgoing.setHeader( 'koorie-api', 'true' )
            outgoing.setHeader( 'content-type', 'application/json' )
            
            const response = { route_index:'response' }
            const buffer = Buffer.from( JSON.stringify( response ) )
            
            good( {
                buffer: buffer,
            } )
        }
        else {
            
            outgoing.statusCode = 500
            outgoing.statusMessage = 'Only GET request here ;)'
            outgoing.setHeader( 'koorie-api', 'false' )
            outgoing.setHeader( 'content-type', 'application/json' )
    
            const failed = { message: 'Only GET request here ;)' }
            const buffer = Buffer.from( JSON.stringify( failed ) )
            
            bad( buffer )
        }
    
    } )
}
