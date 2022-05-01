/**
 * @type {Buffer|null}
 */
let body = null
/**
 * @type {URL.searchParams|null}
 */
let params = null

/**
 * Get body, params and clear on response.
 *
 * @param {string} action - only accept 'insert', 'retrieve', 'clear'
 * @param {string|undefined} type - only accept 'body' OR 'params'
 * @param {Buffer|URLSearchParams|undefined} data - the data to be inserted in the registry
 * @returns {Promise<Buffer|URLSearchParams|ReferenceError>|Buffer|URLSearchParams|ReferenceError}
 */
export default async function request( action, type= undefined, data = undefined ){

    switch ( action ) {

        case 'insert':

            if( typeof data !== 'undefined' )
                type === 'body' ? body = data : params = data
            else
                return new ReferenceError( ' data is required argument when insert is selected' )
            break

        case 'retrieve':

            return type === 'body' ? body : params

        case 'clear':
            body = null
            params = null
            break

        default:
            break
    }
}
