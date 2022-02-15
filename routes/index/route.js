import { undefined_ } from 'oftypes'

/**
 * Route - Index.
 *
 * @param {IncomingMessage} incoming - The given IncomingMessage Object.
 * @param {ServerResponse} outgoing - The given ServerResponse Object.
 * @param {object} koorie - .
 * @returns {Promise | PromiseFulfilledResult<{buffer:Buffer}> | PromiseRejectedResult<Buffer>}
 */
export async function index( incoming, outgoing, koorie ){
    
    if( incoming.method === 'POST' ){
        const message = await koorie.post( 'index', koorie.body_ )
        
        if( await undefined_( message.invalid ) === true ){
            
            return new Promise( ( resolve ) => {
                
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
                resolve( responseMessage )
            } )
        }
    }
    
    return new Promise( ( resolve, reject ) => {
        
        if( incoming.method === 'GET' ) {
            
            outgoing.statusCode = 200
            outgoing.statusMessage = 'Ok'
            outgoing.setHeader( 'koorie-api', 'true' )
            outgoing.setHeader( 'content-type', 'application/json' )
            
            const response = { route_index:'response' }
            const buffer = Buffer.from( JSON.stringify( response ) )
            
            resolve( {
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
            
            reject( buffer )
        }
    
    } )
}
