import activity from '../activity.js'
import { exit_types__ } from '../exporter.js'
import { stderr } from '../../index.js'

const exitSymbol = Symbol( 'Object [ activity.exit ]' )
const exit = Object.defineProperty( activity, exitSymbol, {
    this: this,
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Exits with message and exit code.
     *
     * @param {string|Buffer} message - Required argument.
     * @param {Error} [error_type] - Default set to Error('koorie - InternalError').
     * @param {number} [exit_code=101] - Default set to 101, process exit code.
     */
    value: async function exit( message, error_type = Error( '[koorie - InternalError]' ), exit_code = 101 ){

        const arguments_type_checking = await exit_arguments_type( message, error_type, exit_code )

        /**
         * Checking 'message'
         */
        await arguments_type_checking.next()
            .catch( async rejected => reject( message, rejected ) )

        /**
         * Checking 'error_type'
         */
        await arguments_type_checking.next( )
            .catch( async rejected => reject( error_type, rejected ) )

        /**
         * Checking 'exit_code'
         */
        await arguments_type_checking.next( undefined )
            .catch( async rejected => reject( exit_code, rejected ) )

        // - async function generator done
        await arguments_type_checking.return( undefined )

        // Exits with message and exit code.
        await stderr( `\n${message}\n\n          [stacktrace]\n          ${error_type.stack}\n\n` )
        process.exit( exit_code )
    }
} )

/**
 * Check for the arguments type.
 *
 * @private
 * @param {any} message - Given argument message.
 * @param {any} [error_type] - Given argument error_type.
 * @param {any} [exit_code] - Given argument exit_code.
 * @returns {AsyncGenerator<
 *  {argument:string,expected:string}|boolean,
 *  {argument:string,expected:string}|boolean,
 *  {argument:string,expected:string}|boolean
 *     >}
 */
async function exit_arguments_type( message, error_type, exit_code ) {
    return exit_types__.check( message, error_type, exit_code )
}

/**
 * The exit.types.reject() function, the process will exit with code errors.type_checking = 3.
 *
 * @private
 * @param {*} argument - .
 * @param {{argument:string, expected:string}} rejected - .
 * @returns {void}
 */
async function reject( argument, rejected ) {
    return exit_types__.reject( argument, rejected )
}

export default exit[ exitSymbol ]


