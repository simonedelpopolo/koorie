import { resolvers, undefined_ } from 'oftypes'

/**
 * Object [ input.http2_flag ].
 *
 * - http2_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<Error|undefined>|Error|undefined}
 */
export default async function http2_flag_flag( options ){

    let flag

    /**
     * Resolver true.
     *
     * @returns {undefined}
     */
    const truthy = () => true

    /**
     * Resolver false.
     * --http2_flag-flag doesn't accept any argument.
     *
     * @returns {TypeError}
     */
    const falsy = () => new TypeError( `${ process.title } flag-error` )

    flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

    return new Promise( ( resolve, reject ) => {

        if( flag instanceof Error )
            reject( flag )

        resolve( flag )
    } )
}
