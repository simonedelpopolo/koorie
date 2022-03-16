import { routes_inject, routes_set } from 'koorie'

export default async () => {
    
    // Object [ koorie.routes.inject ] will push into Object [ koorie.routes.collection ]
    // the route property set to an empty string will answer to http://localhost:3001
    // the asyncFunction property will import dynamically the route index
    // these two properties are required
    // routes always declared as async function returning an Answer
    // the incoming property should be set if the route responds to a GET|POST|PUT|DELETE request
    // in this case it will answer at http://localhost:3001 and the request will be GET [?give_me_file=alright]
    // the incoming property must be set to 'give_me_file'
    await routes_inject( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index, incoming: 'give_me_file'  } )
    
    // Object [ koorie.routes.set ] will do type check of the given object to routes_inject() and registering the route inside Object [ koorie.routes.injected ]
    await routes_set()
}
