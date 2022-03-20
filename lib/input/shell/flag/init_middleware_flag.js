import input from '../../../input.js'
import { number_, resolvers, undefined_ } from 'oftypes'

const init_middleware_flagSymbol = Symbol( 'Object [ input.init_middleware_flag ]' )
const init_middleware_flag = Object.defineProperty( input, init_middleware_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.init_middleware_flag ].
     *
     * - middleware flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<string|Error|undefined>|string|Error|undefined}
     */
    value: async function init_middleware_flag( options ){

        /**
         * Type checking for middleware flag.
         *
         * @param {any} check - value from flag.
         * @yields
         * @returns {AsyncGenerator<Promise<unknown>|Promise<never>, void, *>}
         */
        async function* type( check ){

            /**
             * Resolver for true.
             *
             * @returns {PromiseRejectedResult}
             */
            const truthy = ( () => Promise.reject( `${ 'given option -> '.green() }'${check.toString().red()}' - ${ process.title } flags-error` ) )
            /**
             * Resolver for false.
             *
             * @returns {PromiseFulfilledResult}
             */
            const falsy = ( () => Promise.resolve( check ) )

            yield ( await number_( check, await resolvers( truthy, falsy ) ) )()
        }

        let flag

        /**
         * Resolver for true.
         *
         * @returns {undefined}
         */
        const truthy = () => undefined
        /**
         * Resolver for false.
         *
         * @returns {Promise<void>}
         */
        const falsy = async () => {
            const middleware_check = type( options )

            const done = middleware_check.next()
                .then( resolve => resolve.value )
                .catch( error => new TypeError( error ) )

            return middleware_check.return( done ).then( check => check.value )
        }

        flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

        return new Promise( ( resolve, reject ) => {

            if( flag instanceof Error )
                reject( flag )

            resolve( flag )
        } )
    }
} )

export default init_middleware_flag[ init_middleware_flagSymbol ]
