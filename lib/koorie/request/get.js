import { default as request } from '../request.js'
import { request_query_get, request_routes } from '../../../index.js'

const getSymbol = Symbol( 'Object [ koorie.request.get ]' )
const get = Object.defineProperty( request, getSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.request.get ].
     *
     * @param {URLSearchParams} query - the query params.
     * @param {string} path - routes path that responds to the request.
     * @returns {Promise<URLSearchParams | {empty: string}|{invalid:string}> | URLSearchParams | {empty: string} | {invalid:string}}
     */
    value: async function get( query, path ){
        if( request_routes.includes( path ) )
            return request_query_get( query )
        else
            return { invalid: 'path' }
    }
} )

export default get[ getSymbol ]
