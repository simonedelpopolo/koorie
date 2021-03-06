import { Blaze } from '@cli-blaze/decors'
import { number_, resolvers, undefined_ } from 'oftypes'

/**
 * Object [ input.init_license_flag ].
 *
 * - license_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export default async function init_license_flag( options ){

    /**
     * Type checking for license flag.
     *
     * @param {any} check - value from flag.
     * @yields
     * @returns {AsyncGenerator<Promise<Error|string>|Promise<never>, void, *>}
     */
    async function* type( check ){

        const truthy = () => Promise.reject( `${ Blaze.green( 'given option -> ' ) }'${Blaze.red( check.toString() )}' - ${ process.title } flags-error` )
        const falsy = () => Promise.resolve( check )
        yield await ( await number_( check, await resolvers( truthy, falsy ) ) )()

    }

    let flag

    const truthy = () => undefined
    const falsy = async () => {
        const license_check = type( options )

        const done = await license_check.next()
            .then( resolve => resolve.value )
            .catch( error => new TypeError( error ) )

        return license_check.return( done ).then( check => check.value )
    }

    flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

    return new Promise( ( resolve, reject ) => {

        if( flag instanceof Error )
            reject( flag )

        resolve( flag )
    } )
}
