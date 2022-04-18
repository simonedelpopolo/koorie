import { generator } from '../../../input.js'
import input from '@cli-blaze/input/lib/input.js'
import { number_, OftypesError, resolvers, undefined_ } from 'oftypes'

export default Object.defineProperties( input[ Symbol.for( 'input' ) ],
    {
        [ Symbol.for( 'input.type.only_string' ) ]: {
            enumerable: true,
            writable: false,
            configurable: false,

            /**
             * Object [ input.type.only_string ]
             *
             * @param {any} flag - returned
             * @param {any} resolves - value
             * @returns {Promise<string|Error|undefined>|string|Error|undefined}
             */
            value: async function only_string( flag, resolves ) {

                const truthy = () => resolves
                const falsy = async () => {
                    const logic = {
                        flag: flag,
                        routine: [
                            async ( type ) => {
                                if( await number_( type, undefined, undefined ) === true )
                                    return new OftypesError( `${ 'given option -> '.green() }'${type.toString().red()}' - ${ process.title } flag-error` )
                                else return type
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

                return ( await undefined_( flag, await resolvers( truthy, falsy ) ) )()
            }
        }
    }
)
