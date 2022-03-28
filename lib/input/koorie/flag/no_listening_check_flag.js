import input from '../../../input.js'
import { resolvers, undefined_ } from 'oftypes'

const no_listening_check_flagSymbol = Symbol( 'Object [ input.no_listening_check_flag ]' )
const no_listening_check_flag = Object.defineProperty( input, no_listening_check_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.no_listening_check_flag ].
     *
     * - no_listening_check_flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<Error|undefined>|Error|undefined}
     */
    value: async function no_listening_check_flag( options ){

        let flag

        /**
         * Resolver true.
         *
         * @returns {undefined}
         */
        const truthy = () => true

        /**
         * Resolver false.
         * --no_listening_check doesn't accept any argument.
         *
         * @returns {TypeError}
         */
        const falsy = () => new TypeError( `${ process.title } flags-error` )

        flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

        return new Promise( ( resolve, reject ) => {

            if( flag instanceof Error )
                reject( flag )

            resolve( flag )
        } )
    }
} )

export default no_listening_check_flag[ no_listening_check_flagSymbol ]
