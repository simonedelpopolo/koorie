import activity from '../activity.js'

export const stderrSymbol = Symbol( 'process.stderr.write wrapper' )
export const stderr = Object.defineProperty( activity, stderrSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Wrap to process.stderr.write.
     *
     * @param {Buffer|string} message - The message to the stderr.
     * @returns {Promise | PromiseFulfilledResult<string> | PromiseRejectedResult<Error>}
     */
    value: function stderr( message ){
        
        return new Promise( ( resolve, reject ) => {
            
            try{
                process.stderr.write( message )
                resolve( 'done' )
            }catch ( error ) {
                reject( `\x1b[41m [activity.stderr]    \n   \x1b[0m${ error.stack }` )
            }
        } )
    }
} )
