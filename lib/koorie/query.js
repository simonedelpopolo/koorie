import koorie from '../koorie.js'
import { request } from '../../index.js'

export const querySymbol = Symbol( 'Object [ koorie.query ]' )
export const query = Object.defineProperty( koorie, querySymbol, {
    enumerable: true,
    writable:false,
    configurable: false,
    value: async function query( url ){
        /**
         * @type {URLSearchParams}
         */
        request.query_ = new URL( url ).searchParams
    }
} )
