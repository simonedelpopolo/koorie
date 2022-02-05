import koorie from '../koorie.js'
import { logger } from '../../whisk.js'
import { buffer_, object_ } from 'oftypes'

export const outgoingSymbol = Symbol( 'the server outgoing system' )
export const outgoing = Object.defineProperty( koorie, outgoingSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,
    /**
     *  Routing.
     *
     * @param {{buffer:Buffer, log:object}|Error} response - .
     * @param {ServerResponse} outgoing - .
     * @returns {Promise<void>}
     */
    value: async function outgoing( response, outgoing ){
        
        if( await buffer_( response.buffer ) ) {
            outgoing.write( response.buffer )
            outgoing.end()
            logger( { quiet: false, info: [ response.log ] } )
        }else if( await object_( response ) ) {
            outgoing.setHeader( 'content-type', 'application/json' )
            outgoing.write( Buffer.from( '{"error":"no route"}' ) )
            outgoing.end()
            logger( { quiet: false, info: [ response.log ] } )
        }
        
    }
} )
