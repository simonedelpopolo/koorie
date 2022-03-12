import koorie from '../koorie.js'
import { is_json, parse } from 'json-swiss-knife'

const requestSymbol = Symbol( 'Object [ koorie.request ]' )
const request = Object.defineProperty( koorie, requestSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,
    /**
     * @type {{path: *[], query_: null, post: ((function(*, *): Promise<*|{invalid: string}>)|*), body_: null, query: (function(*): Promise<*>), get: ((function(*, *): Promise<*|{invalid: string}>)|*), body: ((function(*): Promise<*|PromiseFulfilledResult<Object>|PromiseRejectedResult<string>|{empty: string}>)|*)}}
     */
    value: {
        path: [],
        body_: null,
        query_: null,
        body: async( raw ) => {
            if( raw.length > 0 && await is_json( raw ) )
                return parse( raw )

            return { empty:'using koorie.post(path,body) without making a POST request body?' }
        },
        query: async( query ) => {
            return query
        },
        get: async( path, query ) => {
            if( internal_.path.includes( path ) )
                return internal_.query( query )
            else
                return { invalid: 'path' }
        },
        post:async( path, body ) => {
            if( internal_.path.includes( path ) )
                return internal_.body( body )
            else
                return { invalid: 'path' }
        },
    }
} )

const internal_ = request[ requestSymbol ]
export default request[ requestSymbol ]
