import { request } from '../../../index.js'

/**
 * Extends Promise and incorporate Object [ koorie.request ]
 * Used into routes to return responses.
 */
export default class Answer extends Promise {

    constructor( responder ) {

        super( responder )
    }

    /**
     * Object [ koorie.request ].
     *
     * @returns {{path: *[], query_: null, post: ((function(*, *): Promise<*|{invalid: string}>)|*), body_: null, query: (function(*): Promise<*>), get: ((function(*, *): Promise<*|{invalid: string}>)|*), body: ((function(*): Promise<*|PromiseFulfilledResult<Object>|PromiseRejectedResult<string>|{empty: string}>)|*)}}
     */
    static koorie(){
        return request
    }

}


