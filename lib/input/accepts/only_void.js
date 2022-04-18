import input from '@cli-blaze/input/lib/input.js'
import { OftypesError, resolvers, undefined_ } from 'oftypes'

export default Object.defineProperties( input[ Symbol.for( 'input' ) ],
    {
        [ Symbol.for( 'input.type.only_void' ) ]: {
            enumerable: true,
            writable: false,
            configurable: false,

            /**
             * Object [ input.type.only_void ]
             *
             * @param {any} flag - returned
             * @param {any} resolves - value
             * @returns {Promise<string|Error|undefined>|string|Error|undefined}
             */
            value: async function only_void( flag, resolves ) {

                /**
                 * Resolver true.
                 *
                 * @returns {any}
                 */
                const truthy = () => resolves

                /**
                 * Resolver false.
                 * --health-flag doesn't accept any argument.
                 *
                 * @returns {TypeError}
                 */
                const falsy = () => new OftypesError( `${ process.title } flags-error` )

                return ( await undefined_( flag, await resolvers( truthy, falsy ) ) )()
            }
        }
    }
)
