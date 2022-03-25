import { remove_query_url } from './functions/remove_query_url.js'
import { default as routing } from '../routing.js'
import { buffer_, object_, undefined_ } from 'oftypes'
import { hot, request_body, request_query } from '../../../index.js'

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

        /**
         * @type {Buffer|{buffer:Buffer,incoming:{length:number,payload:Buffer}}}
         */
        let data
        let buffer
        let response_ready
        let incoming_length
        let incoming_payload
        let error = false

        let url = `${process.env.PROTOCOL}://${process.env.ADDRESS}${Incoming.url}`
        const route = remove_query_url( `${ url }` )
            .replace( `${process.env.PROTOCOL}`, '' )
            .replace( '://', '' )
            .replace( `${process.env.ADDRESS}/`, '' )
            .split( '/' )[ 0 ]

        const routeAsyncFunction = await hot( route )

        await request_body( Incoming )
        await request_query( url )

        data = await routeAsyncFunction( Incoming, Outgoing )
            .catch( failed => failed )

        // If data is Buffer the ServerResponse is ready to be sent
        if ( await buffer_( data ) === true ) {
            buffer = data
            response_ready = true
        }

        // If data is an object
        else if ( await object_( data ) === true ) {

            if ( await undefined_( data.buffer ) === false && await buffer_( data.buffer ) === true ) {

                buffer = data.buffer

                if ( await undefined_( data.incoming ) === false ) {
                    if ( await undefined_( data.incoming.length ) === false && await undefined_( data.incoming.payload ) === false ) {
                        incoming_length = data.incoming.length
                        incoming_payload = data.incoming.payload
                    }
                }

                response_ready = true

            } else {
                response_ready = false
                Outgoing.statusCode = 500
                Outgoing.statusMessage = 'data type error'
                Outgoing.setHeader( 'koorie-error', 500 )
                error = 'data.buffer is NOT oftypes<Buffer> or the property data.buffer is oftypes<undefined>'
            }
        } else {
            response_ready = false
            Outgoing.statusCode = 500
            Outgoing.statusMessage = 'data type error'
            Outgoing.setHeader( 'koorie', 500 )
            error = 'data from route not recognised'
        }

        return {
            buffer: buffer,
            response_ready: response_ready,
            error: error,
            incoming_length: incoming_length,
            incoming_payload: incoming_payload
        }
    }
} )

export default route[ routeSymbol ]
