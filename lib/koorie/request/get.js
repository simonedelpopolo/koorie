import { request_query_get, request_routes } from '../../../private.js'

/**
 * Object [ koorie.request.get ].
 *
 * @param {URLSearchParams} query - the query params.
 * @param {string} path - routes path that responds to the request.
 * @returns {Promise<URLSearchParams | {empty: string}|{invalid:string}> | URLSearchParams | {empty: string} | {invalid:string}}
 */
export default async function get( query, path ) {
    if ( request_routes.includes( path ) )
        return request_query_get( query )
    else
    {return {
        invalid: 'path'
    }}
}
