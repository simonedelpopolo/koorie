import { function_, promise_, resolvers } from 'oftypes'

/**
 * Object [ koorie.routes.set.check ]
 * type check of the exports from the route module.
 *
 * @yields
 * @param {Function|AsyncFunction} route_exports - route exports
 */
export default async function* routes_set_check( route_exports ) {

    let truthy = () => route_exports
    let falsy = () => false

    yield await ( await function_( route_exports, await resolvers( truthy, falsy ) ) )()
    yield await ( await promise_( route_exports, await resolvers( truthy, falsy ) ) )()
}
