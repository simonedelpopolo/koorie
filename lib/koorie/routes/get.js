import { default as routes } from '../routes.js'
import { routes_injected } from '../../../index.js'
import { resolvers, undefined_ } from 'oftypes'

const getSymbol = Symbol( 'Object [ koorie.routes.get ]' )
const get = Object.defineProperty( routes, getSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.routes.get ].
     *
     * @param {string} name - route registered name.
     * @returns {Promise<*|PromiseFulfilledResult<*>>}
     */
    value: async function get( name ){

        const truthy = ( () => routes_injected )
        const falsy = ( () => routes_injected[ name ] )

        return ( await undefined_( name, await resolvers( truthy, falsy ) ) )()
    },
} )

export default get[ getSymbol ]
