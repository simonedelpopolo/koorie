import Answer from '../../lib/extends/Promise/Answer.js'

/**
 * Route - Index.
 *
 * @param {IncomingMessage} incoming - The given IncomingMessage Object.
 * @param {ServerResponse} outgoing - The given ServerResponse Object.
 * @param {object} koorie - .
 * @returns {Promise | PromiseFulfilledResult<{buffer:Buffer}> | PromiseRejectedResult<Buffer>}
 */
export async function gni( incoming, outgoing ){
    
    return new Answer( ( good, bad ) => {
        
        if( incoming.method === 'GET' ) {
            
            outgoing.statusCode = 200
            outgoing.statusMessage = 'Ok'
            outgoing.setHeader( 'koorie-api', 'true' )
            outgoing.setHeader( 'content-type', 'application/json' )
            
            const response = { route_gni:'gniffffffzzzzsssss' }
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
