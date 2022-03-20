import input from '../../../input.js'
import { number_, resolvers, undefined_ } from 'oftypes'

const ejected_flagSymbol = Symbol( 'Object [ input.ejected_flag ]' )
const ejected_flag = Object.defineProperty( input, ejected_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.ejected_flag ].
     *
     * - ejected_flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<string|Error|undefined>|string|Error|undefined}
     */
    value: async function ejected_flag( options ){

        /**
         * Type checking for ejected flag.
         *
         * @param {any} check - value from flag.
         * @yields
         * @returns {AsyncGenerator<Promise<unknown>|Promise<never>, void, *>}
         */
        async function* type( check ){

            yield await number_( check ) === true
                ? Promise.reject( `${ 'given option -> '.green() }'${check.toString().red()}' - ${ process.title } flags-error` )
                : Promise.resolve( check )
        }

        let flag

        const truthy = () => undefined
        const falsy = async () => {

            const ejected_check = type( options )

            const done = ejected_check.next()
                .then( resolve => resolve.value )
                .catch( error => new TypeError( error ) )

            return ejected_check.return( done ).then( check => check.value )

        }


        flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

        return new Promise( ( resolve, reject ) => {

            if( flag instanceof Error )
                reject( flag )

            resolve( flag )
        } )
    }
} )

export default ejected_flag[ ejected_flagSymbol ]
