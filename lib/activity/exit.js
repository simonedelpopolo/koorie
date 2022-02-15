import activity from '../activity.js'
import { buffer_, number_, string_ } from 'oftypes'
import { shell_exit_codes, stderr } from '../../index.js'

export const exitSymbol = Symbol( 'process.exit with message and errors' )
export const exit = Object.defineProperty( activity, exitSymbol, {
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
    value: async function exit( message, error_type = Error( 'koorie - InternalError' ), exit_code = 101 ){
        
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
        await arguments_type_checking.next( )
            .catch( async rejected => reject( exit_code, rejected ) )
        
        // Exits with message and exit code.
        await stderr( `\n${message}\n\n          [stacktrace]\n          ${error_type.stack}\n\n` )
        process.exit( exit_code )
    }
} )

const exitArgumentsTypeSymbol = Symbol( 'type checking activity.exit arguments' )
const exitArgumentsType = Object.defineProperty( exit[ exitSymbol ], exitArgumentsTypeSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: {
        
        check: async function * exit_arguments_type( message, error_type, exit_code ){
            
            // [0] oftypes <string|Buffer> for message argument. rejects with the argument name.
            yield await ( await string_( message ) || await buffer_( message ) ) === false ? await Promise.reject( { argument:'`message`', expected: 'oftypes <string|Buffer>.' } ) : Promise.resolve( true )
            
            // [1] instanceof <Error> for error_type argument. rejects with the argument name.
            yield !( error_type instanceof Error ) ? await Promise.reject( { argument:'`error_type`', expected: 'oftypes <Error>.' } ) : Promise.resolve( true )
            
            // [2] oftypes <number> for exit_code argument. rejects with the argument name.
            yield await number_( exit_code ) === false ? await Promise.reject( { argument:'`exit_code`', expected: 'oftypes <number>.' } ) : Promise.resolve( true )
        },
        
        reject: async ( argument, rejected ) => {
            
            internal_.expected[ 1 ] = rejected.argument
            internal_.expected[ 3 ] = rejected.expected
            
            internal_.actual[ 0 ] = rejected.argument
            internal_.actual[ 3 ] = typeof argument
            internal_.actual[ 5 ] = JSON.stringify( argument )
            await stderr( `\n ${internal_.expected.join( ' ' )}\n\t ${internal_.actual.join( ' ' )} \n\n ${new TypeError( '[stacktrace]' ).stack}`  )
            process.exit( shell_exit_codes.type_checking )
            
        },
        expected:[
            '\x1b[41m [activity.exit - TypeError]',
            null,
            'argument expected to be',
            null,
            '\x1b[0m'
        ],
        actual:[
            null,
            ':',
            '\x1b[32m{',
            null,
            '}\x1b[0m -> \x1b[31m',
            null,
            '\x1b[0m \n\n'
        ]
    }
    
} )

/**
 * Defining the type of activity.exit.exitArgumentsType.
 *
 * @typedef exitArgumentsType
 * @type {object}
 * @property {AsyncGeneratorFunction} check - .
 * @property {Function} reject - .
 * @property {string[]} expected - .
 * @property {string[]} actual - .
 */

/**
 * @type exitArgumentsType
 * @private
 */
const internal_ = exitArgumentsType[ exitArgumentsTypeSymbol ]

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
    return internal_.check( message, error_type, exit_code )
}

/**
 * The exitArgumentsType.reject() function, the process will exit with code errors.type_checking = 3.
 *
 * @private
 * @param {*} argument - .
 * @param {{argument:string, expected:string}} rejected - .
 * @returns {void}
 */
async function reject( argument, rejected ) {
    return internal_.reject( argument, rejected )
}
