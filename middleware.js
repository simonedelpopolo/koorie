import { koorieIncoming, routes } from './index.js'

export default async () => {
    routes.list.push( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index  } )
    routes.list.push( { route:'index', asyncFunction: ( await import( './routes/index/route.js' ) ).index  } )
    koorieIncoming.path.push( '' )
    koorieIncoming.path.push( 'index' )
    await routes.set()
}
