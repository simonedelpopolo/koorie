import activity from '../activity.js'

const stderrSymbol = Symbol( 'Object [ activity.stderr ]' )
const stderr = Object.defineProperty( activity, stderrSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Wrap to process.stderr.write.
     *
     * @param {Buffer|string} message - The message to the stderr.
     * @returns {Promise<string> | string}
     */
    value: function stderr( message ){

        return new Promise( ( resolve, reject ) => {

            try{
                process.stderr.write( message )
                resolve( 'done' )
            }catch ( error ) {
                reject( `${ '[ activity.stderr ]    \n   '.bg_red() }${ error.stack }` )
            }
        } )
    }
} )

export default stderr[ stderrSymbol ]


