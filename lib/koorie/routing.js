import koorie from '../koorie.js'
import { logger } from '../../index.js'

export const routingSymbol = Symbol( 'the server routing system' )
export const routing = Object.defineProperty( koorie, routingSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,
    /**
     *  Routing.
     *
     * @param {{buffer:Buffer, log:object}|Error} response - .
     * @param {IncomingMessage=} incoming - .
     * @param {ServerResponse=} outgoing - .
     * @returns {Promise<void>}
     */
    value: async function routing( response, incoming, outgoing ){
        
        if( Buffer.isBuffer( response.buffer ) ) {
            outgoing.write( response.buffer )
            outgoing.end()
            logger( { quiet: false, info: [ response.log ] } )
        }else if( response instanceof Error )
            logger( { quiet: false, info: [ response ] } )
    }
} )
