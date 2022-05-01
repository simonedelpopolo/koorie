import { resolvers, undefined_ } from 'oftypes'

/**
 * Object [ input.silenced_flag ].
 *
 * - silenced_flag flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<Error|undefined>|Error|undefined}
 */
export default async function silenced_flag( options ){

    let flag

    /**
     * Resolver true.
     *
     * @returns {undefined}
     */
    const truthy = () => true

    /**
     * Resolver false.
     * --silenced doesn't accept any argument.
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
