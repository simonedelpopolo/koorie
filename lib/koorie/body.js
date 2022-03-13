import koorie from '../koorie.js'
import { request } from '../../index.js'

const bodySymbol = Symbol( 'Object [ koorie.body ]' )
const body = Object.defineProperty( koorie, bodySymbol, {
    enumerable: true,
    writable:false,
    configurable: false,

    /**
     * Object [ koorie.body ].
     *
     * @param {IncomingMessage} raw - the incoming message body
     * @returns {Promise<void>|void}
     */
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

export default body[ bodySymbol ]
