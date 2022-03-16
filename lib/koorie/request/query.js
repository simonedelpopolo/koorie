import { request } from '../../../index.js'
import { default as request__ } from '../request.js'

const querySymbol = Symbol( 'Object [ koorie.request.query ]' )
const query = Object.defineProperty( request__, querySymbol, {
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

        await request( 'insert', 'params', new URL( url ).searchParams )
    }
} )

export default query[ querySymbol ]
