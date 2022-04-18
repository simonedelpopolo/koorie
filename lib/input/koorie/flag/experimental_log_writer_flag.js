import input from '@cli-blaze/input/lib/input.js'
import { only_void, promise } from '../../../../input.js'

export default Object.defineProperties( input[ Symbol.for( 'input' ) ],
    {
        [ Symbol.for( 'input.experimental_log_writer_flag' ) ]: {
            enumerable: true,
            writable: false,
            configurable: false,

            /**
             * Object [ input.experimental_log_writer_flag ]
             *
             * - --experimental_log_writer type check.
             *
             * @param {string} options - the value from the shell.
             * @throws { Error }
             * @returns {Promise<Error|undefined>|Error|undefined}
             */
            value: async function experimental_log_writer_flag( options ){

                let flag = await only_void( options, true )

                return promise( flag )
            }
        } } )
