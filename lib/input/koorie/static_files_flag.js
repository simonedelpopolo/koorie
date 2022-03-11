import input from '../../input.js'
import { number_, resolvers, undefined_ } from 'oftypes'

const static_files_flagSymbol = Symbol( 'Object [ input.static_files_flag ]' )
const static_files_flag = Object.defineProperty( input, static_files_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.static_files_flag ].
     *
     * - static-files flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<string|Error|undefined>|string|Error|undefined}
     */
    value: async function static_files_flag( options ){

        /**
         * Type checking for static-files flag.
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
            const static_files_check = type( options )

            const done = static_files_check.next()
                .then( resolve => resolve.value )
                .catch( error => new TypeError( error ) )

            return static_files_check.return( done ).then( check => check.value )
        }

        flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

        return new Promise( ( resolve, reject ) => {

            if( flag instanceof Error )
                reject( flag )

            resolve( flag )
        } )
    }
} )

export default static_files_flag[ static_files_flagSymbol ]
