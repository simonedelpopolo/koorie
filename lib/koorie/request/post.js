import { default as request } from '../request.js'
import { request_body_get, request_routes } from '../../../index.js'

const postSymbol = Symbol( 'Object [ koorie.request.post ]' )
const post = Object.defineProperty( request, postSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.request.post ].
     *
     * @param {Buffer} raw - the raw body.
     * @param {string} path - routes path that responds to the request.
     * @returns {Promise<{[p: string]: any} | {empty: string}|{invalid:string}> |  {[p: string]: any} | {empty: string} | {invalid:string}}
     */
    value: async function post( raw, path ){
        if( request_routes.includes( path ) )
            return request_body_get( raw )
        else
            return { invalid: 'path' }
    }
} )

export default post[ postSymbol ]
