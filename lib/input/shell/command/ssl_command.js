import input from '../../../input.js'
import { undefined_ } from 'oftypes'

export const ssl_commandSymbol = Symbol( 'Object [ input.ssl_command ]' )
export const ssl_command = Object.defineProperty( input, ssl_commandSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * The koorie-shell ssl options type checking.
     * - todo type checking.
     *
     * @param {any} options - .
     * @returns {Promise<Error|undefined>| Error|undefined}
     */
    value: async function ssl_command( options ) {

        let command = ''

        command = ( await undefined_( options ) )()

        return new Promise( ( resolve, reject ) => {

            if( command instanceof Error )
                reject( command )

            resolve( command )
        } )
    }
} )

export default ssl_command[ ssl_commandSymbol ]
