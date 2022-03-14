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

const options = {
    static_files: 'public',
    port: 30214,
    hot: true,
    secure:{
        active: true,
        key: 'certs/koorie.key.pem',
        cert: 'certs/koorie.cert.pem',
        dhparam: 'certs/koorie.dhparam.pem'
    },
    logger: { quiet: true },
    socket: {
        active: true,
        path: '/tmp/ejected.sock'
    },
    ejected: `${process.cwd()}/ejected.js`,
    cluster: 2
}


await server( await ejected( options ) )
