import { number_ } from 'oftypes'

/**
 * The react-dang private functions.
 *
 * @type {{process_exit: ((function((string|*), Error=, number=): Promise<void>)|*), stderr: flags__.stderr}}
 * @private
 */
export const flags__ = {
    
    /**
     * Wrap to process.stderr.write.
     *
     * @param {string|any} message - The message to the stderr.
     */
    stderr: ( message ) => {
        process.stderr.write( message )
    },
    
    /**
     * Single error thrown to process.stderr.write.
     *
     * @param {string|any} error - Required argument. The message to the stderr.
     * @param {Error=} errorType - Default set to Error('rd-InternalError'). The error type should be: InternalError, TypeError or anything that describes the error.
     * @param {number=} exitCode - Default set to 1, The exit code to send back.
     */
    process_exit: async ( error, errorType = Error( 'rd-app-InternalError' ), exitCode = 1 ) => {
        
        if(  errorType.name !== 'Error' ){
            const messageReject = '\x1b[41m [rd-app-TypeError] Only Error is accepted for argument `errorType`.\x1b[0m '
            const errorErrorType = `\n ${messageReject}\n\t Given argument: \x1b[32m{${ typeof errorType }}\x1b[0m -> \x1b[31m ${JSON.stringify( errorType )}\x1b[0m \n\n`
            stderr( `${errorErrorType}` )
            process.exit( 1 )
        }
        
        if( await number_( exitCode ) === false ){
            const messageReject = `\x1b[41m [${errorType}] Only type of number is accepted for argument \`exitCode\`.\x1b[0m `
            const errorExitCode = `\n ${messageReject}\n\t Given argument: \x1b[32m{${ typeof exitCode }}\x1b[0m -> \x1b[31m ${JSON.stringify( exitCode )}\x1b[0m \n\n`
            stderr( `${errorExitCode}` )
            process.exit( 1 )
        }
        
        // The terminal stderr
        stderr( '\n' )
        stderr( `\x1b[41m         ${error}\x1b[0m` )
        stderr( '\n' )
        stderr( '\n' )
        stderr( '          [stacktrace]' )
        stderr( '\n' )
        stderr( `          ${errorType.stack}` )
        stderr( '\n\n' )
        process.exit( exitCode )
    }
}

/**
 * Wrap to process.stderr.write.
 *
 * @param {string|any} message - The message to the stderr.
 */
export function stderr( message ){
    flags__.stderr( message )
}

/**
 * Single error thrown to process.stderr.write.
 *
 * @param {string|any} error - Required argument. The message to the stderr.
 * @param {Error=} errorType - Default set to Error('rd-InternalError'). The error type should be: InternalError, TypeError or anything that describes the error.
 * @param {number=} exitCode - Default set to 1, The exit code to send back.
 */
export async function process_exit( error, errorType = Error( 'rd-InternalError' ), exitCode = 1 ){
    await flags__.process_exit( error, errorType, exitCode )
}
