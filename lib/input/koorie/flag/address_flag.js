import input from '@cli-blaze/input/lib/input.js'
import { generator, promise } from '../../../../input.js'
import { number_, OftypesError, resolvers, undefined_ } from 'oftypes'

export default Object.defineProperties( input[ Symbol.for( 'input' ) ],
    {
        [ Symbol.for( 'input.address_flag' ) ]:{
            enumerable: true,
            writable: false,
            configurable: false,

            /**
             * Object [ input.address_flag ].
             *
             * - --address type check.
             *
             * @param {string} options - check
             * @throws { Error }
             * @returns {Promise<string|Error|undefined>|string|Error|undefined}
             */
            value: async function address_flag( options ){

                let flag

                const truthy = () => undefined
                const falsy = async () => {
                    const logic = {
                        flag: options,
                        routine: [
                            async ( flag ) => {
                                if( await number_( flag, undefined, undefined ) === true )
                                    return new OftypesError( `${ 'given option -> '.green() }'${flag.toString().red()}' - ${ process.title } flag-error` )
                                else return flag
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
