import koorie from '../koorie.js'
import { koorieIncoming } from '../../whisk.js'

export const bodySymbol = Symbol( 'Handler for the incoming body of POST requests' )
export const body = Object.defineProperty( koorie, bodySymbol, {
    enumerable: true,
    writable:false,
    configurable: false,
    value: async function body( raw ){
        const incomingBodyBuffers = []
        for await ( const chunk of raw )
            incomingBodyBuffers.push( chunk )
    
        /**
         * @type {Buffer}
         */
        koorieIncoming.body_ = Buffer.concat( incomingBodyBuffers )
    }
} )
