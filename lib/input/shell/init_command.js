import input from '../../input.js'
import { undefined_ } from 'oftypes'

export const init_commandSymbol = Symbol( 'Object [ input.init_command ]' )
export const init_command = Object.defineProperty( input, init_commandSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * The koorie-shell init command doesn't accept any options.
     *
     * @param {any} options - if any options is given just exits.
     * @returns {Promise<Error|undefined>| Error|undefined}
     */
    value: async function init_command( options ) {

        let command

        const resolvers = {

            true:( () => {

                return undefined
            } ),
            false: ( () => {
                return new TypeError( `init doesn't take any argument. Given -> ${ options }` )
            } )
        }

        command = ( await undefined_( options, resolvers ) )()

        return new Promise( ( resolve, reject ) => {

            if( command instanceof Error )
                reject( command )

            resolve( command )
        } )
    }
} )

export default init_command[ init_commandSymbol ]
