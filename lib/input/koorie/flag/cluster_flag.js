import input from '@cli-blaze/input/lib/input.js'
import { generator, promise } from '../../../../input.js'
import { number_, OftypesError, resolvers, string_, undefined_ } from 'oftypes'

export default Object.defineProperties( input,
    {
        [ Symbol.for( 'input.cluster_flag' ) ] : {
            enumerable: true,
            writable: false,
            configurable: false,

            /**
             * Object [ input.cluster_flag ].
             *
             * - --cluster type check.
             *
             * @param {string} options - check
             * @throws { Error }
             * @returns {Promise<string|number|Error>|string|number|Error}
             */
            value: async function cluster_flag( options ){

                let flag

                /**
                 * Resolver true.
                 *
                 * @returns {boolean}
                 */
                const truthy = () => true

                /**
                 * Resolver false.
                 *
                 * @returns {Promise<*>}
                 */
                const falsy = async () => {

                    const logic = {
                        flag: options,
                        routine: [
                            async ( flag ) => {
                                if( await number_( flag, undefined, undefined ) === true )
                                    return parseInt( flag )
                                else if ( await string_( flag ) === true && flag === 'full' )
                                    return flag
                                else
                                    return new OftypesError( `${ 'given option -> '.green() }'${flag.toString().red()}' - ${ process.title } flag-error` )
                            }
                        ]
                    }

                    let type

                    for await( const check of await generator( logic ) ){
                        if( check instanceof Error ) {
                            type = check
                            break
                        }
                        type = check
                    }

                    return type
                }

                flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

                return promise( flag )
            }
        }
    }
)
