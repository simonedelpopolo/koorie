import { request } from '../../../index.js'
import { default as request__ } from '../request.js'

const bodySymbol = Symbol( 'Object [ koorie.request.body ]' )
const body = Object.defineProperty( request__, bodySymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.request.body ].
     *
     * @param {IncomingMessage} raw - the IncomingMessage raw body
     * @returns {Promise<void>|void}
     */
    value: async function body( raw ){

        const buffer = []
        for await ( const chunk of raw )
            buffer.push( chunk )

        await request( 'insert', 'body', Buffer.concat( buffer ) )
    }
} )

export default body[ bodySymbol ]
