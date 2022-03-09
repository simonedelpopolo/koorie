import koorie from '../koorie.js'
import { process_exit, request } from '../../index.js'
import { promise_, undefined_ } from 'oftypes'

export const routesSymbol = Symbol( 'This Object is a container for API routes.' )
export const routes = Object.defineProperty( koorie, routesSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: {
        list: [],
        route:{},
        set: async () => {

            const resolvers = {
                true:( async ( route, asyncFunction, incoming ) => {
                    internal_.route[ route ] = asyncFunction
                    if( incoming )
                        request.path.push( incoming )
                } ),
                false: ( async () => {
                    await process_exit(
                        'koorie-routes',
                        Error( 'koorie-Route-Error' ),
                        105 )
                } )
            }

            let makeRoute
            for ( const route in internal_.list ){

                makeRoute = await promise_( internal_.list[ route ].asyncFunction, resolvers )
                await makeRoute( internal_.list[ route ].route, internal_.list[ route ].asyncFunction, internal_.list[ route ].incoming )

            }
        },
        get:async( name ) => {
            return undefined_( name, { true: internal_.route, false:internal_.route[ name ] } )
        }
    }
} )

const internal_ = routes[ routesSymbol ]
