import input from '../../../input.js'
import { resolvers, undefined_ } from 'oftypes'

const health_flagSymbol = Symbol( 'Object [ input.health_flag ]' )
const health_flag = Object.defineProperty( input, health_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.health_flag ].
     *
     * - health_flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<Error|undefined>|Error|undefined}
     */
    value: async function health_flag( options ){

        let flag

        /**
         * Resolver true.
         *
         * @returns {undefined}
         */
        const truthy = () => true

        /**
         * Resolver false.
         * --health-flag doesn't accept any argument.
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

export default health_flag[ health_flagSymbol ]
