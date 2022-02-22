import koorie from '../koorie.js'
import { request_id } from './initialize.js'
import { routes } from '../../index.js'
import { true_false } from 'boolean-jokes'

export const hotSymbol = Symbol( 'Object [ koorie.hot ] handler for the hot functionality' )
export const hot = Object.defineProperty( koorie, hotSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Dynamic importing route without the need for the server to be restarted, if the flag --hot has given.
     * Otherwise, return the asyncFunction registered in the middleware.js.
     *
     * @param {string} route - The route passed from koorie.routing.
     * @returns {(incoming:IncomingMessage, outgoing:ServerResponse)=>Answer}
     */
    value: async function hot( route ){
    
        // - hot reloading of routes
        if( await true_false( process.env.HOT ) === true ) {
            const hot_route = route.length === 0 ? 'index' : route
            // eslint-disable-next-line capitalized-comments
            // noinspection JSFileReferences
            
            return ( await import( `${process.cwd()}/routes/${ hot_route }/route.js?${request_id}` ) )[ hot_route ]
        }
        else
            // If a route has been found, calls the AsyncFunction of the route
            return routes.get( route )
    }
} )
