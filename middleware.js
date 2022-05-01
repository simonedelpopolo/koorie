import { routes_inject, routes_set } from './index.js'

export default async () => {
    await routes_inject( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index  } )
    await routes_inject( { route:'*', asyncFunction: ( await import( './routes/all/route.js' ) ).all  } )
    await routes_set()
}
