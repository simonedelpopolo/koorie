import { routes } from 'koorie'

export default async () => {
    routes.list.push( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index  } )
    await routes.set()
}
