import { hot } from '../../../index.js'
import { remove_query_url } from './functions/remove_query_url.js'
import { default as routing } from '../routing.js'
import { buffer_, oftype_ } from 'oftypes'

const routeSymbol = Symbol( 'Object [ koorie.routing.route ]' )
const route = Object.defineProperty( routing, routeSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.routing.route ]
     * elaborates the ServerResponse based on the requested route.
     *
     * @param {IncomingMessage} Incoming - incoming
     * @param {ServerResponse} Outgoing - outgoing
     * @returns {Promise<{Object}>|Object}
     */
    value: async function routing_route( Incoming, Outgoing ) {

        let buffer = undefined
        let error = false

        const route = remove_query_url( `${ Incoming.url }` )
            .split( '/' )[ 1 ]

        const RouteExport = await hot( route )

        /**
         * @type {Buffer|Error|Answer}
         */
        let RouteAnswer

        if( await oftype_( RouteExport ) === 'Function' ) {
            RouteAnswer = RouteExport( Incoming, Outgoing )

            if( RouteAnswer instanceof Promise )
                RouteAnswer = await RouteAnswer.catch( failed => failed )

        }
        else if( await oftype_( RouteExport ) === 'AsyncFunction' )
            RouteAnswer = await RouteExport( Incoming, Outgoing ).catch( failed => failed )

        // If data is Buffer the ServerResponse is ready to be sent
        if ( await buffer_( RouteAnswer ) === true ){
            buffer = RouteAnswer
            if ( Outgoing.hasHeader( 'error' ) ) {
                error = Outgoing.getHeader( 'error' )
                Outgoing.removeHeader( 'error' )
            }
        }

        else if( RouteAnswer instanceof Error ){
            Outgoing.statusCode = 500
            Outgoing.statusMessage = 'data type error'
            Outgoing.setHeader( 'koorie-error', 500 )
            buffer = Buffer.from( '{"internal":"error"}' )
            error = RouteAnswer.message
        }
        else {
            if( !Outgoing.writableEnded ) {
                Outgoing.statusCode = 500
                Outgoing.statusMessage = 'data type error'
                Outgoing.setHeader( 'koorie-error', 500 )
                error = 'buffer is NOT oftypes<Buffer> or is oftypes<undefined>'
                buffer = Buffer.from( '{"internal":"error"}' )
            }
        }

        return {
            buffer: buffer,
            response_buffer: true,
            error: error
        }
    }
} )

export default route[ routeSymbol ]
