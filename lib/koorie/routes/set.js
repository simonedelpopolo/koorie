import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { oftype_ } from 'oftypes'
import { default as routes } from '../routes.js'
import { request_routes, routes_collection, routes_injected, routes_set_check } from '../../../index.js'

const setSymbol = Symbol( 'Object [ koorie.routes.set ]' )
const set = Object.defineProperty( routes, setSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.routes.set ].
     */
    value:  async function set (){

        for ( const route in routes_collection ){

            const routes_collectionKeys = Object.keys( routes_collection[ route ] )

            if( routes_collectionKeys.includes( 'asyncFunction' ) && routes_collectionKeys.includes( 'syncFunction' ) )
                await exit( 'only one property asyncFunction OR syncFunction, not both', new TypeError( 'koorie.routes.set' ), error_code.TYPE )

            if( ! ( routes_collectionKeys.includes( 'asyncFunction' ) ) && !( routes_collectionKeys.includes( 'syncFunction' ) ) )
                await exit( 'injection of routes require a property set to asyncFunction OR syncFunction', new TypeError( 'koorie.routes.set' ), error_code.TYPE )

            let function_type
            if( routes_collection[ route ].asyncFunction )
                function_type = 'asyncFunction'
            else if( routes_collection[ route ].syncFunction )
                function_type = 'syncFunction'

            const function_type_check = await routes_set_check( routes_collection[ route ][ function_type ] )

            let result_check
            result_check = await function_type_check.next().then( result => result.value ).catch( console.error )

            if( await oftype_( result_check ) !== 'Function' )
                result_check = await function_type_check.next().then( result => result.value ).catch( console.error )

            const RouteExport = await function_type_check.return( result_check ).then( final_result => final_result.value ).catch( console.error )

            if( RouteExport === false )
                await exit( `given ${function_type} isn't an AsyncFunction neither a Function. given type -> ${await oftype_( routes_collection[ route ][ function_type ] )}`, new TypeError( 'koorie.routes.set' ), error_code.TYPE )

            routes_injected[ routes_collection[ route ].route ] = RouteExport
            if( routes_collection[ route ].incoming )
                request_routes.push( routes_collection[ route ].incoming )

        }

    }
} )

export default set[ setSymbol ]
