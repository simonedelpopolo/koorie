import { request_body_get, request_routes } from '../../../private.js'

/**
 * Object [ koorie.request.post ].
 *
 * @param {Buffer} raw - the raw body.
 * @param {string} path - routes path that responds to the request.
 * @returns {Promise<{[p: string]: any} | {empty: string}|{invalid:string}> |  {[p: string]: any} | {empty: string} | {invalid:string}}
 */
export default async function post( raw, path ){
    if( request_routes.includes( path ) )
        return request_body_get( raw )
    else
        return { invalid: 'path' }
}
