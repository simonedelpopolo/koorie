import { true_false } from 'boolean-jokes'
import { boolean_, undefined_ } from 'oftypes'

/**
 * Object [ input.hot_flag ].
 *
 * - hot_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export default async function hot_flag( options ){

    /**
     * Type checking for hot flag.
     *
     * @param {any} check - value from flag.
     * @yields
     * @returns {AsyncGenerator<Promise<unknown>|Promise<never>, void, *>}
     */
    async function* type( check ){

        const boolean = await true_false( check )
        const resolvers = {
            true:( () => {return Promise.resolve( check )} ),
            false:( () => {return Promise.reject( `${ process.title } flags-error` )} )
        }

        yield ( await boolean_( boolean, resolvers ) )()
    }

    let flag

    const resolvers = {

        true:() => {

            return true
        },
        false: async () => {

            const hot_check = await type( options )

            const done = hot_check.next()
                .then( resolve => resolve.value )
                .catch( error => new TypeError( error ) )

            return hot_check.return( done ).then( check => check.value )

        }
    }

    flag = await  ( await undefined_( options, resolvers ) )()

    return new Promise( ( resolve, reject ) => {

        if( flag instanceof Error )
            reject( flag )

        resolve( flag )
    } )
}


