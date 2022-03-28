import set from '../set.js'
import { function_, promise_, resolvers } from 'oftypes'

const checkSymbol = Symbol( 'Object [ koorie.routes.set.check ]' )
const check = Object.defineProperty( set, checkSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.routes.set.check ]
     * type check of the exports from the route module.
     *
     * @yields
     * @param {Function|AsyncFunction} route_exports - route exports
     */
    value: async function* routes_set_check( route_exports ) {

        let truthy = () => route_exports
        let falsy = () => false

        yield await ( await function_( route_exports, await resolvers( truthy, falsy ) ) )()
        yield await ( await promise_( route_exports, await resolvers( truthy, falsy ) ) )()
    }
} )

export default check[ checkSymbol ]
