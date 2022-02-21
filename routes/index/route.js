import Answer from '../../lib/extends/Promise/Answer.js'
import { undefined_ } from 'oftypes'

/**
 * Route - Index.
 *
 * @param {IncomingMessage} incoming - The given IncomingMessage Object.
 * @param {ServerResponse} outgoing - The given ServerResponse Object.
 * @param {object} koorie - .
 * @returns {Promise | PromiseFulfilledResult<{buffer:Buffer}> | PromiseRejectedResult<Buffer>}
 */
export async function index( incoming, outgoing ){

    if( incoming.method === 'POST' ){
        const message = await Answer.koorie().post( 'index', await Answer.koorie().body_ )
        
        if( await undefined_( message.invalid ) === true ){
            
            return new Answer( ( good ) => {
                
                outgoing.statusCode = 200
                outgoing.setHeader( 'content-type', 'application/json' )
                outgoing.setHeader( 'koorie-api', 'true' )
                outgoing.statusMessage = 'Ok'
                
                let bufferIncoming = Buffer.from( JSON.stringify( message ) )
                let responseMessage = {
                    buffer:bufferIncoming,
                    incoming:{
                        length: Buffer.byteLength( bufferIncoming ),
                        payload: bufferIncoming
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
            
            const response = { route_index:'responseSðððððððynciiiii' }
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
