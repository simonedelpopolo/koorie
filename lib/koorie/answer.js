import { request, request_get, request_post } from '../../private.js'

/**
 * Extends Promise and incorporate Object [ koorie.request ]
 * Used into routes to return responses.
 */
export default class Answer extends Promise {

    constructor( responder ) {

        super( responder )
    }

    /**
     * Object [ koorie.request(retrieve, [body|params]) ].
     *
     * @param {string} type - it only accept 'body' OR 'params'
     * @returns {Promise<Buffer|URLSearchParams>|Buffer|URLSearchParams}
     */
    static async getQuestion( type ){
        return request( 'retrieve', type ).catch( error => error )
    }

    /**
     * Object [ koorie.request.get ].
     *
     * @param {URLSearchParams} query - the query params.
     * @param {string} path - routes path that responds to the request.
     * @returns {Promise<URLSearchParams | {empty: string}|{invalid:string}> | URLSearchParams | {empty: string} | {invalid:string}}
     */
    static async toGet( query, path ){
        return request_get( query, path ).catch( error => error )
    }

    /**
     * Object [ koorie.request.post ].
     *
     * @param {Buffer} raw - the raw body.
     * @param {string} path - routes path that responds to the request.
     * @returns {Promise<{[p: string]: any} | {empty: string}|{invalid:string}> |  {[p: string]: any} | {empty: string} | {invalid:string}}
     */
    static async toPost ( raw, path ){
        return request_post( raw, path ).catch( error => error )
    }

    /**
     * Clear the private variable body and params of Object [ koorie.request ].
     *
     * @returns {Promise<void>}
     */
    static async clearQuestion(){
        await request( 'clear' ).catch( error => error )
    }

}


