import { undefined_ } from 'oftypes'

/**
 * The koorie-shell ssl options type checking.
 * - todo type checking.
 *
 * @param {any} options - .
 * @returns {Promise<Error|undefined>| Error|undefined}
 */
export default async function ssl_command( options ) {

    let command = ''

    command = ( await undefined_( options ) )()

    return new Promise( ( resolve, reject ) => {

        if( command instanceof Error )
            reject( command )

        resolve( command )
    } )
}
