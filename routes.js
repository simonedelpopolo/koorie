import { function_ } from 'oftypes'
import { index } from './routes/index/route.js'
import { process_exit, routes } from './index.js'

const routes_list = [
    { route:'', func:index }
    
]

export default async () => {
    
    const resolvers = {
        true:( async ( route, func ) => {
            routes[ route ] = func
        } ),
        false: ( async () => {await process_exit(
            'koorie-routes',
            Error( 'koorie-Route-Error' ),
            105 )} )
    }
    
    let makeRoute
    for ( const r in routes_list ){
        makeRoute = await function_( routes_list[ r ].func, resolvers )
        await makeRoute( routes_list[ r ].route, routes_list[ r ].func )
    }
    
}
