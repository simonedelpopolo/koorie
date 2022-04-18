import input from '@cli-blaze/input/lib/input.js'
import { only_string, promise } from '../../../../input.js'

export default Object.defineProperties( input[ Symbol.for( 'input' ) ],
    {
        [ Symbol.for( 'input.address_flag' ) ]:{
            enumerable: true,
            writable: false,
            configurable: false,

            /**
             * Object [ input.address_flag ]
             *
             * - --address type check.
             *
             * @param {string} options - check
             * @throws { Error }
             * @returns {Promise<string|Error|undefined>|string|Error|undefined}
             */
            value: async function address_flag( options ){

                const flag = await only_string( options, undefined )

                return promise( flag )
            }
        }
    }
)
