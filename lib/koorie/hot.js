import { access } from 'node:fs/promises'
import { request_id } from './dispatcher.js'
import { routes_get } from '../../private.js'
import { true_false } from 'boolean-jokes'

/**
 * Dynamic importing route without the need for the server to be restarted, if the flag --hot has given.
 * Otherwise, return the asyncFunction registered in the middleware.js.
 *
 * @param {string} route - The route passed from koorie.routing.
 * @returns {(incoming:IncomingMessage, outgoing:ServerResponse)=>Answer}
 */
export default async function hot( route ){

    // - hot reloading of routes
    if( await true_false( process.env.HOT ) === true ) {
        const hot_route = route.length === 0 ? 'index' : route
        // eslint-disable-next-line capitalized-comments
        // noinspection JSFileReferences

        const filename = `${process.cwd()}/routes/${ hot_route }/route.js`

        /**
         * **If route file is not found.**
         *
         * ❗|
         *
         * |❗
         *
         *   this scenario comes when routes are ejected from the predefined path.
         *   normally **hot wired** looks for the route file at the predefined path ./routes/{route_name}/route.js
         *
         *   **ejected state** pros and cons
         *
         *   - the route can be declared and registered into other files.
         *
         *   - from this derives that the **hot wired** won't work when **ejected state**.
         *
         *   - any editing to **ejected state** routes will require the server to be restarted to see the changes.
         */
        const error = await access( filename ).catch( error => error )

        if( error instanceof Error )

            return routes_get( route )


        return ( await import( `${filename}?${request_id}` ) )[ hot_route ]
    }
    else
        // If a route has been found, calls the AsyncFunction of the route
        return routes_get( route )
}
