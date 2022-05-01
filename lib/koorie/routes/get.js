import { routes_injected } from '../../../private.js'
import { resolvers, undefined_ } from 'oftypes'

/**
 * Object [ koorie.routes.get ].
 *
 * @param {string} name - route registered name.
 * @returns {Promise<*|PromiseFulfilledResult<*>>}
 */
export default async function get( name ){

    const truthy = ( () => routes_injected )
    const falsy = ( () => routes_injected[ name ] )

    return ( await undefined_( name, await resolvers( truthy, falsy ) ) )()
}
