import { basename } from 'path'
import koorie from '../koorie.js'
import { remove_query_url } from './routing/functions/remove_query_url.js'
import { true_false } from 'boolean-jokes'
import { buffer_, undefined_ } from 'oftypes'
import {
    model,
    resource_get_public,
    routing_file,
    routing_route
} from '../../index.js'
import { number_of_connections, worker } from './dispatcher.js'

const routingSymbol = Symbol( 'Object [ koorie.routing ]' )
const routing = Object.defineProperty( koorie, routingSymbol, {
    enumerable: true,
    writable:false,
    configurable: false,

    /**
     * Object [ koorie.routing ]
     * sends back @ Object [ koorie.dispatcher ] the ServerResponse data.
     *
     * @param {IncomingMessage} Incoming - incoming
     * @param {ServerResponse} Outgoing - outgoing
     * @returns {Promise<{buffer:Buffer,log:Object}>| {buffer:Buffer,log:Object}}
     */
    value: async function routing( Incoming, Outgoing ){

        let response_ready
        let error = false
        let gone = false

        /**
         * @type {ArrayBufferLike|string|Object}
         */
        let buffer
        /**
         * @type {number|null}
         */
        let incoming_length = null
        /**
         * @type {Buffer|null}
         */
        let incoming_payload = null

        let library_message = process.env.LIBRARY === 'false' ? false : `specified library -> ${ process.env.LIBRARY }`

        const public_path = resource_get_public()

        /**
         * URL/filename requested with query url stripped off if any.
         *
         * @type {string}
         */
        let requested_resource = remove_query_url( `${ public_path }${ Incoming.url }` )
        const route = requested_resource.replace( `${public_path}/`, '' ).split( '/' )
        const models = await model( process.env.LIBRARY, requested_resource )

        switch ( models.constructor.name ){

            // - this case happens when a route hase been found in the registered routes
            case 'String': {
                let route_response = await routing_route( Incoming, Outgoing )
                error = route_response.error
                response_ready = route_response.response_ready
                buffer = route_response.buffer
                incoming_length = route_response.incoming_length
                incoming_payload = route_response.incoming_payload
            }
                break

            // - this case happens when a file has been found into the 'public' directory
            case 'Readable': {

                let readable_response = await routing_file( requested_resource, models, Outgoing )
                error = readable_response.error
                response_ready = readable_response.response_ready
                buffer = readable_response.buffer
                gone = readable_response.gone
            }
                break

            // - this case handles error when no files or routes have been found and the --library doesn't appear in the available ones.
            case 'Boolean':

                Outgoing.statusCode = 500
                Outgoing.statusMessage = 'Not Found'
                Outgoing.setHeader( 'koorie', 404 )

                library_message = process.env.LIBRARY === 'false' ? 'no library specified anyway' : `specified library -> ${ process.env.LIBRARY }`
                error = 'no route or file has been found. missed the --library={string[react|solid|static]} flag?'
                response_ready = false
                break

            // - this case happens when a route hasn't been found in the registered ones
            case 'Number':

                response_ready = false
                Outgoing.statusCode = 404
                Outgoing.statusMessage = 'Not Found'
                Outgoing.setHeader( 'koorie', 500 )
                error = { not_found: route[ 0 ] }
                break

            // - this case happens when a file hasn't been found in the 'public' directory
            case 'Error':

                response_ready = false
                Outgoing.statusCode = 404
                Outgoing.statusMessage = 'Not Found'
                Outgoing.setHeader( 'koorie', 404 )
                error = models.message
                break

            // - this case happens for anything else not yet implemented
            default:

                response_ready = false
                Outgoing.statusCode = 500
                Outgoing.statusMessage = 'Internal Error'
                Outgoing.setHeader( 'koorie', 500 )
                error = { internal_error: 'needs investigation' }
                break

        }

        const content_length = await buffer_( buffer ) === true ? Buffer.byteLength( buffer ) : 0
        const payload = await undefined_( buffer ) === true ? null: buffer
        const socket_active = await true_false( process.env.SOCKET_ACTIVE )
        const socket_path = process.env.SOCKET_PATH
        const secure_active = await true_false( process.env.SECURE )

        return new Promise( ( resolve, reject ) => {

            // - when the first request is triggered the log prints response statusCode.
            let log = { code:  Outgoing.statusCode }

            // - this happens just once during the bootstrap of the server.
            if( process.env.FIRST !== 'true' ) {

                // - reduced log size when --silence flag is invoked.
                if ( process.env.SILENCED === 'true' ) {
                    log = {
                        method: Incoming.method,
                        url: Incoming.url,
                        code: Outgoing.statusCode,
                        ip: Incoming.socket.remoteAddress,
                        date: new Date(),
                    }
                } else if ( process.env.SILENCED === 'false' ) {
                    log = {
                        worker: worker.id,
                        date: worker.date,
                        method: Incoming.method,
                        filename: basename( Incoming.url ),
                        url: Incoming.url,
                        incoming: {
                            length: incoming_length === null ? null : incoming_length,
                            payload: incoming_payload === null ? null : incoming_payload,
                        },
                        message: Outgoing.statusMessage,
                        ip: Incoming.socket.remoteAddress,
                        code: Outgoing.statusCode,
                        headers: Outgoing.getHeaders(),
                        'content-length': content_length,
                        payload: payload,
                        error: error,
                        library: library_message,
                        hot: process.env.HOT,
                        connections_since: number_of_connections,
                        ssl: secure_active,
                        http2: false,
                        socket: {
                            active: socket_active,
                            path: socket_path,
                        },
                    }
                }
            }

            if( response_ready === true )
                resolve( { buffer: buffer, log: log, gone: gone } )

            else if( response_ready === false )
                reject( { log: log } )

        } )
    },
} )

export default routing[ routingSymbol ]
