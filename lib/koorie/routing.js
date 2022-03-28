import koorie from '../koorie.js'
import { remove_query_url } from './routing/functions/remove_query_url.js'
import { buffer_, undefined_ } from 'oftypes'
import {
    model, request,
    request_body,
    request_query,
    resource_get_public,
    routing_file,
    routing_route,
} from '../../index.js'

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

        /**
         * @type {boolean}
         */
        let response_ready = true

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
                error = route_response.error
                response_ready = route_response.response_ready
                buffer = route_response.buffer
            }
                break

            // - this case happens when a file has been found into the 'public' directory
            case 'Readable': {

                let readable_response = await routing_file( requested_resource, models, Outgoing )
                error = readable_response.error
                response_ready = readable_response.response_ready
                buffer = readable_response.buffer
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


        // - populating log only if it is not silenced
        // - dynamically importing logger_log Objects
        let logger_log
        if ( process.env.SILENCED === 'false' ){

            logger_log = ( await import( './logger/log.js' ) ).default
            const logger_log_value = ( await import( './logger/log.js' ) ).logger_log_value

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


        return new Promise( ( resolve, reject ) => {

            let log

            // - this happens just once during the bootstrap of the server.
            // - override the on_listening_check using the --no-listening-check flag
            if( process.env.ON_LISTENING_CHECK_REQUEST ){
                log = { code:  Outgoing.statusCode, 'on-listening-check': true }
                resolve( { buffer: buffer, log: log } )
            }
            else{
                // - reduced log size when --silence flag is invoked.
                if ( process.env.SILENCED === 'true' ) {
                    log = {
                        method: Incoming.method,
                        url: full_url,
                        code: Outgoing.statusCode,
                        ip: Incoming.socket.remoteAddress,
                        date: new Date(),
                    }
                } else if ( process.env.SILENCED === 'false' )
                    log = logger_log()

                if( response_ready )
                    resolve( { buffer: buffer, log: log } )

                else
                    reject( { log: log } )

            }

        } )
    },
} )

export default routing[ routingSymbol ]
