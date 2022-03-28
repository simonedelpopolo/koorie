import input from '../../../input.js'
import { resolvers, undefined_ } from 'oftypes'

const experimental_log_writer_flagSymbol = Symbol( 'Object [ input.experimental_log_writer_flag ]' )
const experimental_log_writer_flag = Object.defineProperty( input, experimental_log_writer_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.experimental_log_writer_flag ].
     *
     * - experimental_log_writer_flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<Error|undefined>|Error|undefined}
     */
    value: async function experimental_log_writer_flag( options ){

        let flag

        /**
         * Resolver true.
         *
         * @returns {undefined}
         */
        const truthy = () => true

        /**
         * Resolver false.
         * --experimental_log_write-flag doesn't accept any argument.
         *
         * @returns {TypeError}
         */
        const falsy = () => new TypeError( `${ process.title } flags-error` )

        flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

        return new Promise( ( resolve, reject ) => {

            if( flag instanceof Error )
                reject( flag )

            resolve( flag )
        } )
    }
} )

export default experimental_log_writer_flag[ experimental_log_writer_flagSymbol ]
