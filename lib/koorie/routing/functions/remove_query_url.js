/**
 * Removes the query from the given URL/filename.
 *
 * @param {string} filename - URL/filename
 * @returns {string}
 */
export function remove_query_url( filename ){
    const get_request = filename.indexOf( '?' )
    if( get_request > 0 )
        /**
         * URL requested by the browser sliced off all the queries.
         *
         * @type {string}
         */
        return filename.slice( 0, get_request )

    return filename
}
