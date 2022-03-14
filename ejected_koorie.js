import { Answer, ejected, routes_inject, routes_set, server } from './public.js'

/**
 * Your middleware collection.
 *
 * @returns {Promise<void>}
 */
async function middleware(){
    await routes_inject( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index, incoming: ''  } )
    await routes_inject( { route:'index', asyncFunction: ( await import( './routes/index/route.js' ) ).index, incoming: 'index'  } )
    await routes_inject( { route:'about', asyncFunction: about  } )
    await routes_set()
}

await middleware()
/**
 * About.
 *
 * @returns {Answer}
 */
async function about(){
    return new Answer( good => good( Buffer.from( 'about' ) ) )
}

/**
 * - when clustering in **ejected state** 'ejected' is a required parameter or flag.
 *
 * @type {{cluster: number, static_files: string, port: number, ejected: string, logger: {quiet: boolean}, socket: {path: string, active: boolean}, hot: boolean, secure: {dhparam: string, active: boolean, cert: string, key: string}}}
 */
const options = {
    static_files: 'public',
    port: 30214,
    // - necessary to specified when clustering.
    hot: typeof process.env.EJECTED === 'undefined' ? true : process.env.HOT,
    secure:{
        active: true,
        key: 'certs/koorie.key.pem',
        cert: 'certs/koorie.cert.pem',
        dhparam: 'certs/koorie.dhparam.pem'
    },
    logger: { quiet: false },
    socket: {
        active: true,
        path: '/tmp/ejected.sock'
    },
    // - when clustering in **ejected state** ejected is a required parameter or flag
    ejected: 'ejected_koorie.js',
    cluster: undefined
}

/**
 * - **it is possible to call middleware function before without passing it to server function.**
 */
await server( await ejected( options ) )
