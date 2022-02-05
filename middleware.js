import { routes } from './whisk.js'

export default async () => {
    routes.list.push( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index  } )
    routes.list.push( { route:'index', asyncFunction: ( await import( './routes/index/route.js' ) ).index  } )
    await routes.set()
}
