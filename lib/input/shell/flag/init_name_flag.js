import { Blaze } from '@cli-blaze/decors'
import npm_name from 'validate-npm-package-name'
import { number_, resolvers, undefined_ } from 'oftypes'

/**
 * Object [ input.init_name_flag ].
 *
 * - name_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export default async function init_name_flag( options ){

    /**
     * Type checking for name flag.
     *
     * @param {any} check - value from flag.
     * @yields
     * @returns {AsyncGenerator<Promise<Error|string>|Promise<never>, void, *>}
     */
    async function* type( check ){

        const truthy = () => Promise.reject( `[ only string - error ] ${ Blaze.green( 'given option -> ' ) }'${Blaze.red( check.toString() )}'` )
        const falsy = () => Promise.resolve( check )
        yield await ( await number_( check, await resolvers( truthy, falsy ) ) )()


        const valid = () => Promise.resolve( check )
        const invalid = ( error ) => Promise.reject( `[ valid npm package - error ] ${ Blaze.green( 'given option -> ' ) }'${Blaze.red( check.toString() )}' ${error}` )

        const valid_npm_package_name = npm_name( check )
        yield valid_npm_package_name.validForNewPackages === true ? await valid() : await invalid( valid_npm_package_name.errors )
    }

    let flag

    const truthy = () => undefined
    const falsy = async () => {
        const name_check = type( options )

        const number_check = await name_check.next()
            .then( resolve => resolve.value )
            .catch( error => new TypeError( error ) )


        if( number_check instanceof Error )
            return name_check.return( number_check ).then( check => check.value )

        const done = await name_check.next()
            .then( resolve => resolve.value )
            .catch( error => new TypeError( error ) )

        return name_check.return( done ).then( check => check.value )
    }

    flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

    return new Promise( ( resolve, reject ) => {

        if( flag instanceof Error )
            reject( flag )

        resolve( flag )
    } )
}
