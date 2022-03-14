import { Answer, routes_inject, routes_set } from './public.js'

export default async () => {
    await routes_inject( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index, incoming: ''  } )
    await routes_inject( { route:'index', asyncFunction: ( await import( './routes/index/route.js' ) ).index, incoming: 'index'  } )
    await routes_inject( { route:'about', asyncFunction:async() => {
        return new Answer( good => good( Buffer.from( 'about' ) ) )
    }  } )
    await routes_set()

}
