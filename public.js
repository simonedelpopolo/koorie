import { oftype_ } from 'oftypes'
import {
    Answer as Answer__,
    configuration as configuration__,
    ejected as ejected__,
    routes_inject as routes_inject__,
    routes_set as routes_set__,
    server as server__
} from './index.js'

/**
 * JSDoc typedef
 *
 * @global
 */
/**
 * Represents an async function.
 *
 * @typedef {Function} AsyncFunction
 */

/**
 * Objects exported publicly.
 *
 * @public
 */

/**
 * Object [ koorie.server].
 *
 * **! IMPORTANT ! when doing your own bootstrap file**.
 *
 * **Replacing `koorie --many-flags='options(option1:value|option2:value2)'` it's very simple.**
 *
 * **single instance, cluster, https and socket active.**.
 *
 * @example
 * import { Answer, ejected, routes_inject, routes_set, server } from 'koorie'
 *
 * //Your middleware collection.
 * async function middleware(){
 *     await routes_inject( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index, incoming: ''  } )
 *     await routes_inject( { route:'index', asyncFunction: ( await import( './routes/index/route.js' ) ).index, incoming: 'index'  } )
 *     await routes_inject( { route:'about', asyncFunction: about  } )
 *     routes.set()
 * }
 *
 * await middleware()
 *
 * // **if hot wired any modification to this route needs the server to be restarted.**
 * async function about(){
 *     return new Answer( good => good( Buffer.from( 'about' ) ) )
 * }
 *
 * const options = {
 *     static_files: 'public',
 *     port: 30214,
 *     hot: true,
 *     secure:{
 *         active: true,
 *         key: 'certs/koorie.key.pem',
 *         cert: 'certs/koorie.cert.pem',
 *         dhparam: 'certs/koorie.dhparam.pem'
 *     },
 *     logger: { quiet: true },
 *     socket: {
 *         active: true,
 *         path: '/tmp/ejected.sock'
 *     },
 *     // - when clustering in **ejected state** ejected is a required parameter or flag
 *     ejected: `${process.cwd()}/ejected_koorie.js`,
 *     cluster: 2
 * }
 * // it is possible to call middleware function before without passing it to server function.
 * await server( options )
 * @param {KoorieServerArgumentProperties} flags - Parsed arguments.
 * @param {AsyncFunction|undefined=} middleware - the middleware module.
 * @returns {Promise<void>|void}
 */
export async function server( flags = null, middleware= undefined ){

    if( await oftype_( middleware ) !== 'undefined' && await oftype_( middleware ) === 'Promise' )
        await middleware()

    await server__( flags )
}

/**
 * Object [ koorie.configuration ]
 * koorie configuration file function.
 *
 * @param {string=} [path=.koorierc] - path to your configuration file. Default ./.koorierc in the root directory of the project.
 * @param { boolean=} process_cwd - default the absolute path starts from process.cwd(). set it to false and, it will use just the argument 'path'.
 * @returns {Promise<KoorieServerArgumentProperties> | KoorieServerArgumentProperties}
 */
export async function configuration( path = '.koorierc', process_cwd = true ){
    return configuration__( path, process_cwd )
}

/**
 * Object [ koorie.routes.inject ].
 *
 * @param {{}} route - the route imported or ejected
 */
export async function routes_inject( route ){
    return routes_inject__( route )
}

/**
 * Object [ koorie.routes.set ].
 *
 * @returns {Promise<void>|void}
 */
export async function routes_set(){
    return routes_set__()
}

/**
 * Object [ koorie.ejected ].
 * type check the given argument using Object [ input.koorie_process ] & start a koorie ejected state.
 *
 * @param {KoorieServerArgumentProperties} [initializer=null] - the initializer object that replace process.argv
 * @returns {KoorieServerArgumentProperties}
 */
export async function ejected( initializer = null ){
    return ejected__( initializer )
}

/**
 * Extends Promise and incorporate Object [ koorie.request ]
 * Used into routes to return responses.
 */
export const Answer = Answer__
