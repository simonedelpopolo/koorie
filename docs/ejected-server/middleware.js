import { routes_inject, routes_set } from 'koorie'

export default async () => {
    await routes_inject( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index } )
    await routes_set()
}
