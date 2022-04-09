import koorie from '../koorie.js'
import { remove_query_url } from './routing/functions/remove_query_url.js'
import { true_false } from 'boolean-jokes'
import { buffer_, undefined_ } from 'oftypes'
import {
    model,
    request,
    request_body,
    request_query,
    resource_get_public,
    routing_all,
    routing_file,
    routing_route,
} from '../../index.js'
import { number_of_connections, request_id, worker } from './dispatcher.js'

/**
 * @type {Promise<Object>| Object}
 */
export let routing_log

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
     * @returns {Promise<Buffer|undefined>| Buffer|undefined}
     */
    value: async function routing( Incoming, Outgoing ){

        /**
         * @type {boolean}
         */
        let response_buffer = true

        /**
         * @type {string}
         */
        let error

        /**
         * @type {string|boolean}
         */
        let library_message = process.env.LIBRARY === 'false' ? false : `specified library -> ${ process.env.LIBRARY }`

        /**
         * @type {ArrayBufferLike|string|Object}
         */
        let buffer

        /**
         * Response already SENT case Readable model
         *
         * @type {undefined|number}
         */
        let buffer_content_length_readable = undefined
        /**
         * Response already SENT case Readable model
         *
         * @type {undefined|number}
         */
        let buffer_payload_readable = undefined

        const public_path = resource_get_public()

        let full_url = `${process.env.PROTOCOL}://${process.env.ADDRESS}${Incoming.url}`
        await request_body( Incoming )
        await request_query( full_url )

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

                response_buffer = true
                error = route_response.error
                response_buffer = route_response.response_buffer
                buffer = route_response.buffer
            }
                break

            // - this case happens when a file has been found into the 'public' directory
            case 'Readable': {

                let readable_response = await routing_file( requested_resource, models, Outgoing )

                buffer_content_length_readable = readable_response.buffer_content_length
                buffer_payload_readable = readable_response.buffer_payload
                response_buffer = false
                error = readable_response.error
            }
                break

            // - this case happens when the catch_all route is injected and is syncFunction
            case 'Function': {

                let catch_all_response = await routing_all( models, Incoming, Outgoing )

                response_buffer = true
                error = catch_all_response.error
                response_buffer = catch_all_response.response_buffer
                buffer = catch_all_response.buffer
            }

                break

            // - this case happens when the catch_all route is injected and is asyncFunction
            case 'AsyncFunction': {

                let catch_all_response = await routing_all( models, Incoming, Outgoing )

                response_buffer = true
                error = catch_all_response.error
                response_buffer = catch_all_response.response_buffer
                buffer = catch_all_response.buffer
            }

                break

            // - this case happens when a route hasn't been found in the registered ones
            case 'Number':

                Outgoing.statusCode = 404
                Outgoing.statusMessage = 'Not Found'
                Outgoing.setHeader( 'koorie', 500 )

                response_buffer = true
                buffer = Buffer.from( '{"error":"no route"}' )
                error = { not_found: route[ 0 ] }
                break

            // - this case happens when a file hasn't been found in the 'public' directory
            case 'Error':

                Outgoing.statusCode = 404
                Outgoing.statusMessage = 'Not Found'
                Outgoing.setHeader( 'koorie', 404 )

                response_buffer = true
                buffer = Buffer.from( '{"error":"no route"}' )
                error = models.message
                library_message = process.env.LIBRARY === 'false' ? 'no library specified anyway' : `specified library -> ${ process.env.LIBRARY }`
                break

            // - this case happens for anything else not yet implemented
            default:

                Outgoing.statusCode = 500
                Outgoing.statusMessage = 'Internal Error'
                Outgoing.setHeader( 'koorie', 500 )

                response_buffer = true
                buffer = Buffer.from( '{"internal":"no route"}' )
                error = { internal_error: 'needs investigation' }
                break

        }

        /**
         * - populating log only if it is not silenced
         * - dynamically importing logger_log Objects.
         *
         * @type {AsyncFunction}
         * @returns {Promise<Object> | Object }
         */
        let logger_log
        const log_silenced  = await true_false( process.env.SILENCED )

        if ( ! log_silenced ){

            logger_log = ( await import( './logger/log.js' ) ).default
            const logger_log_value = ( await import( './logger/log.js' ) ).logger_log_value

            if( buffer_content_length_readable && buffer_payload_readable )
                buffer = buffer_payload_readable

            let body = await request( 'retrieve', 'body' ) || Buffer.alloc( 0 )
            logger_log_value.error = error
            logger_log_value.library_message = library_message
            logger_log_value.request_method = Incoming.method
            logger_log_value.request_filename = requested_resource
            logger_log_value.request_url = full_url
            logger_log_value.incoming_body_content_length = Buffer.byteLength( body )
            logger_log_value.incoming_body_payload = body
            logger_log_value.incoming_url_params = await request( 'retrieve', 'params' )
            logger_log_value.request_ip_address = Incoming.socket.remoteAddress
            logger_log_value.outgoing_body_content_length = await buffer_( buffer ) === true ? Buffer.byteLength( buffer ) : 0
            logger_log_value.outgoing_body_payload = await undefined_( buffer ) === true ? null: buffer
            logger_log_value.response_headers = Outgoing.getHeaders()
            logger_log_value.response_status_code = Outgoing.statusCode
        }

        // ONLY resolves
        return new Promise( ( resolve ) => {

            // - reduced log size when --silence flag is invoked.
            if ( log_silenced ) {
                routing_log = {
                    method: Incoming.method,
                    url: full_url,
                    code: Outgoing.statusCode,
                    ip: Incoming.socket.remoteAddress,
                    date: new Date(),
                    worker_id: worker.id,
                    connections_since: number_of_connections,
                    request_id: request_id,
                }
            }

            // - the whole log
            else if( ! log_silenced ) routing_log = logger_log()

            if( response_buffer ) resolve( buffer )

            else resolve( undefined )
        } )
    },
} )

export default routing[ routingSymbol ]
