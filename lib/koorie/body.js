import koorie from '../koorie.js'
import { request } from '../../index.js'

export const bodySymbol = Symbol( 'Object [ koorie.body ]' )
export const body = Object.defineProperty( koorie, bodySymbol, {
    enumerable: true,
    writable:false,
    configurable: false,
    value: async function body( raw ){
        const buffer = []
        for await ( const chunk of raw )
            buffer.push( chunk )

        /**
         * @type {Buffer}
         */
        request.body_ = Buffer.concat( buffer )
    }
} )
