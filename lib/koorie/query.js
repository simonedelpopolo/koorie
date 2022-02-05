import koorie from '../koorie.js'
import { koorieIncoming } from '../../whisk.js'

export const querySymbol = Symbol( 'Handler for the incoming body of GET requests' )
export const query = Object.defineProperty( koorie, querySymbol, {
    enumerable: true,
    writable:false,
    configurable: false,
    value: async function query( url ){
        /**
         * @type {URLSearchParams}
         */
        koorieIncoming.query_ = new URL( url ).searchParams
    }
} )
