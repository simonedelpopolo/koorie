import koorie from '../koorie.js'
import { request } from '../../index.js'

const querySymbol = Symbol( 'Object [ koorie.query ]' )
const query = Object.defineProperty( koorie, querySymbol, {
    enumerable: true,
    writable:false,
    configurable: false,
    /**
     * Object [ koorie.query ].
     *
     * @param {string} url - the url requested from the browser.
     * @returns {Promise<void>}
     */
    value: async function query( url ){
        /**
         * @type {URLSearchParams}
         */
        request.query_ = new URL( url ).searchParams
    }
} )

export default query[ querySymbol ]
