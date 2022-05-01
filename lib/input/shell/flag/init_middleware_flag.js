import { Blaze } from '@cli-blaze/decors'
import { number_, resolvers, undefined_ } from 'oftypes'

/**
 * Object [ input.init_middleware_flag ].
 *
 * - middleware flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export default async function init_middleware_flag( options ){

    /**
     * Type checking for middleware flag.
     *
     * @param {any} check - value from flag.
     * @yields
     * @returns {AsyncGenerator<Promise<unknown>|Promise<never>, void, *>}
     */
    async function* type( check ){

        /**
         * Resolver for true.
         *
         * @returns {PromiseRejectedResult}
         */
        const truthy = ( () => Promise.reject( `${ Blaze.green( 'given option -> ' ) }'${Blaze.red( check.toString() )}' - ${ process.title } flags-error` ) )
        /**
         * Resolver for false.
         *
         * @returns {PromiseFulfilledResult}
         */
        const falsy = ( () => Promise.resolve( check ) )

        yield ( await number_( check, await resolvers( truthy, falsy ) ) )()
    }

    let flag

    /**
     * Resolver for true.
     *
     * @returns {undefined}
     */
    const truthy = () => undefined
    /**
     * Resolver for false.
     *
     * @returns {Promise<void>}
     */
    const falsy = async () => {
        const middleware_check = type( options )

        const done = middleware_check.next()
            .then( resolve => resolve.value )
            .catch( error => new TypeError( error ) )

        return middleware_check.return( done ).then( check => check.value )
    }

    flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

    return new Promise( ( resolve, reject ) => {

        if( flag instanceof Error )
            reject( flag )

        resolve( flag )
    } )
}
