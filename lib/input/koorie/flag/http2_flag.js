import input from '../../../input.js'
import { resolvers, undefined_ } from 'oftypes'

export default Object.defineProperties( input,
    {
        [ Symbol.for( 'input.http2_flag' ) ]:{
            enumerable: true,
            writable: false,
            configurable: false,

            /**
             * Object [ input.http2_flag ].
             *
             * - http2_flag type check.
             *
             * @param {string} options - the value from the shell.
             * @throws { Error }
             * @returns {Promise<Error|undefined>|Error|undefined}
             */
            value: async function http2_flag_flag( options ){

                let flag

                /**
                 * Resolver true.
                 *
                 * @returns {undefined}
                 */
                const truthy = () => true

                /**
                 * Resolver false.
                 * --http2_flag-flag doesn't accept any argument.
                 *
                 * @returns {TypeError}
                 */
                const falsy = () => new TypeError( `${ process.title } flag-error` )

                flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

                return new Promise( ( resolve, reject ) => {

                    if( flag instanceof Error )
                        reject( flag )

                    resolve( flag )
                } )
            }
        }
    }
)
