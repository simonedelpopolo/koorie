/**
 * Route - index.
 *
 * @returns {PromiseRejectedResult<Buffer>}
 */
export async function index(  ){
    
    return new Promise( resolve => {
        
        resolve( Buffer.from( JSON.stringify( { 'index-route': 'response' } ) ) )
        
    } )
}
