/**
 * Route - Index.
 *
 * @param {IncomingMessage} incoming - The given IncomingMessage Object.
 * @param {ServerResponse} outgoing - The given ServerResponse Object.
 * @returns {Promise<string>|module}
 */
export async function index( incoming, outgoing ){
    
    return new Promise( ( resolve, reject ) => {
    
        if( incoming.method === 'GET' ) {
            
            outgoing.statusCode = 200
            outgoing.statusMessage = 'OK'
            outgoing.setHeader( 'lightweight-api', 'true' )
            outgoing.setHeader( 'content-type', 'application/json' )
            
            resolve( {
                buffer: Buffer.from( JSON.stringify( { route_index:'response' } ) ),
            } )
        }
        else {
            
            outgoing.statusCode = 500
            outgoing.statusMessage = 'Only GET request here ;)'
            outgoing.setHeader( 'lightweight-api', 'false' )
            outgoing.setHeader( 'content-type', 'application/json' )
            
            reject( Buffer.from( JSON.stringify( { message: 'Only GET request here ;)' } ) ) )
        }
    
    } )
}
