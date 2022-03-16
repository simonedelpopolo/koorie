import koorie from '../koorie.js'

/**
 * @type {Buffer|null}
 */
let body = null
/**
 * @type {URL.searchParams|null}
 */
let params = null

const requestSymbol = Symbol( 'Object [ koorie.request ]' )
const request = Object.defineProperty( koorie, requestSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,

    /**
     * Get body, params and clear on response.
     *
     * @param {string} action - only accept 'insert', 'retrieve', 'clear'
     * @param {string|undefined} type - only accept 'body' OR 'params'
     * @param {Buffer|URLSearchParams|undefined} data - the data to be inserted in the registry
     * @returns {Promise<Buffer|URLSearchParams|ReferenceError>|Buffer|URLSearchParams|ReferenceError}
     */
    value: async function request( action, type= undefined, data = undefined ){

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
} )
export default request[ requestSymbol ]
