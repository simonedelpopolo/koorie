import { routes } from './index.js'

export default async () => {
    routes.list.push( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index, incoming: ''  } )
    routes.list.push( { route:'index', asyncFunction: ( await import( './routes/index/route.js' ) ).index, incoming: 'index'  } )
    await routes.set()
}
