import input from '@cli-blaze/input/lib/input.js'
import { only_string, promise } from '../../../../input.js'

export default Object.defineProperties( input[ Symbol.for( 'input' ) ],
    {
        [ Symbol.for( 'input.ejected_flag' ) ]: {
            enumerable: true,
            writable: false,
            configurable: false,

            /**
             * Object [ input.ejected_flag ]
             *
             * - --ejected type check.
             *
             * @param {any} options - check
             * @throws { Error }
             * @returns {Promise<string|Error|undefined>|string|Error|undefined}
             */
            value: async function ejected_flag( options ){

                const flag = await only_string( options, undefined )

                return promise( flag )
            }
        }
    },
)
