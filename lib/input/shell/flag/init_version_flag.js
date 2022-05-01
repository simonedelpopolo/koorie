import { Blaze } from '@cli-blaze/decors'
import semver from 'semver'
import { null_, number_, resolvers, undefined_ } from 'oftypes'

/**
 * Object [ input.init_version_flag ].
 *
 * - version_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export default async function init_version_flag( options ){

    /**
     * Type checking for version flag.
     *
     * @param {any} check - value from flag.
     * @yields
     * @returns {AsyncGenerator<Promise<Error|string>|Promise<never>, void, *>}
     */
    async function* type( check ){

        // - check if not number
        const number = () => Promise.reject( `[ only string - error ] ${ Blaze.green( 'given option -> ' ) }'${ Blaze.red( check.toString() )}'` )
        let not_number = () => Promise.resolve( check )

        yield await ( await number_( check, await resolvers( number, not_number ) ) )()

        // - check semver correctness
        const truthy = () => Promise.reject( `[semver - error ] ${ Blaze.green( 'given option -> ' ) }'${ Blaze.red( check.toString() )}'` )
        const falsy = () => Promise.resolve( check )

        yield await ( await null_( semver.valid( check ), await resolvers( truthy, falsy ) ) )()
    }

    let flag

    const truthy = () => undefined
    const falsy = async () => {
        const version_check = type( options )

        const number_check = await version_check.next()
            .then( resolve => resolve.value )
            .catch( error => new TypeError( error ) )

        if( number_check instanceof Error )
            return version_check.return( number_check ).then( check => check.value )

        const done = await version_check.next()
            .then( resolve => resolve.value )
            .catch( error => new TypeError( error ) )

        return version_check.return( done ).then( check => check.value )
    }

    flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

    return new Promise( ( resolve, reject ) => {

        if( flag instanceof Error )
            reject( flag )

        resolve( flag )
    } )
}
