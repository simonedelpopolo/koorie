import { promise_ } from 'oftypes'
import { default as routes } from '../routes.js'
import { process_exit, request_routes, routes_collection, routes_injected } from '../../../index.js'

const setSymbol = Symbol( 'Object [ koorie.routes.set ]' )
const set = Object.defineProperty( routes, setSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.routes.set ].
     */
    value:  async function set (){

        const resolvers = {
            true:( async ( route, asyncFunction, incoming ) => {
                routes_injected[ route ] = asyncFunction
                if( incoming )
                    request_routes.push( incoming )
            } ),
            false: ( async () => {
                await process_exit(
                    'koorie-set',
                    Error( 'koorie-Route-Error' ),
                    105 )
            } )
        }

        let makeRoute
        for ( const route in routes_collection ){

            makeRoute = await promise_( routes_collection[ route ].asyncFunction, resolvers )
            await makeRoute( routes_collection[ route ].route, routes_collection[ route ].asyncFunction, routes_collection[ route ].incoming )

        }

    }
} )

export default set[ setSymbol ]
