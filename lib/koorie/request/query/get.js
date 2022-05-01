/**
 * Object [ koorie.request.query.get ].
 *
 * @param {URLSearchParams} params - get the parsed params.
 * @returns {Promise<URLSearchParams|{empty:string}>|URLSearchParams|{empty: string}}
 */
export default async function get( params ){
    if( Array.from( params ).length > 0 )
        return params

    return { empty:'using Objects [ koorie.request.get ] without setting params to the GET?' }
}
