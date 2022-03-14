import koorie from '../koorie.js'
import { true_false } from 'boolean-jokes'
import { basename, extname } from 'path'
import { body, hot, library, query, request, resource, routes_get } from '../../index.js'
import { buffer_, object_, undefined_ } from 'oftypes'
import { number_of_connections, worker } from './initialize.js'

const routingSymbol = Symbol( 'Object [ koorie.routing ]' )
const routing = Object.defineProperty( koorie, routingSymbol, {
    enumerable: true,
    writable:false,
    configurable: false,

    /**
     * Dispatches the server requests/responses.
     *
     * @param {{requested_resource:string,server:{incoming:IncomingMessage, outgoing:ServerResponse}}} parameters - The given object parameters.
     * @returns {Promise<unknown>}
     */
    value: async function routing( parameters ){

        let responseReady
        let responseLog
        let error = false
        let library_message = process.env.LIBRARY === 'false' ? false : `specified library -> ${ process.env.LIBRARY }`

        /**
         * @type {ArrayBufferLike}
         */
        let buffer
        /**
         * @type {number|null}
         */
        let incomingLength = null
        /**
         * @type {Buffer|null}
         */
        let incomingPayload = null

        const public_path = await resource.get_public()

        /**
         * URL requested by the browser.
         *
         * @type {string}
         */
        let requested_resource = parameters.requested_resource

        /**
         * @type {number}
         */
        const get_request = requested_resource.indexOf( '?' )
        if( get_request > 0 )
            /**
             * URL requested by the browser sliced off all the queries.
             *
             * @type {string}
             */
            requested_resource = requested_resource.slice( 0, get_request )

        /**
         * @type {ServerResponse}
         */
        const outgoing = parameters.server.outgoing
        /**
         * @type {IncomingMessage}
         */
        const incoming = parameters.server.incoming

        /**
         * @type {string[]}
         */
        const routesKeys = Object.keys( await routes_get() )
        const route = requested_resource.replace( `${public_path}/`, '' ).split( '/' )
        const routeUrl = `${process.env.PROTOCOL}://${process.env.ADDRESS}${incoming.url}`
        const javascript_library = await library( process.env.LIBRARY, { filename: requested_resource, public_path: public_path } )

        // Looks for the route in the routes Object.
        if( routesKeys.includes( route[ 0 ] ) ){

            /**
             * @type {Buffer|{buffer:Buffer,incoming:{length:number,payload:Buffer}}}
             */
            let data

            const routeAsyncFunction = await hot( route[ 0 ] )

            // The koorie.incoming.path is dynamic. needs to be static.
            // Find a way to register the post/get/delete/put
            route.splice( 0, 1 )

            await body( incoming )
            await query( routeUrl )

            if( route.length > 0 ){
                for ( const path in route ){
                    if( request.path.includes( route[ path ] ) === false )
                        request.path.push( route[ path ] )
                }
            }

            data = await routeAsyncFunction( incoming, outgoing ).catch( failed => failed )

            // If data is Buffer the ServerResponse is ready to be sent
            if( await buffer_( data ) === true ) {
                buffer = data
                responseReady = true
            }
            // If data is an object
            else if( await object_( data ) === true ){

                if( await undefined_( data.buffer ) === false && await buffer_( data.buffer ) === true ) {

                    buffer = data.buffer

                    if( await undefined_( data.incoming ) === false ){
                        if( await undefined_( data.incoming.length ) === false && await undefined_( data.incoming.payload ) === false ){
                            incomingLength = data.incoming.length
                            incomingPayload = data.incoming.payload
                        }
                    }

                    responseReady = true

                }
                else {
                    responseReady = false
                    outgoing.statusCode = 500
                    outgoing.statusMessage = 'data type error'
                    outgoing.setHeader( 'koorie-error', 'true' )
                    error = 'data.buffer is NOT oftypes<Buffer> or the property data.buffer is oftypes<undefined>'
                }
            }else{
                responseReady = false
                outgoing.statusCode = 500
                outgoing.statusMessage = 'data type error'
                outgoing.setHeader( 'koorie-error', 'true' )
                error = 'data from route not recognised'
            }

            // NOT FOUND API KOORIE
        }else if( javascript_library === false ){

            outgoing.statusCode = 404
            outgoing.statusMessage = 'Not Found'
            outgoing.setHeader( 'koorie-not-found', 'true' )

            library_message = process.env.LIBRARY === 'false' ? 'no library specified anyway' : `specified library -> ${ process.env.LIBRARY }`
            error = 'no route or file has been found. missed the --library[lb]={string[react|solid]} flag?'
            responseReady = false

            // LIBRARY | STATIC_FILE
        }else if( await buffer_( javascript_library ) === true ){

            if( extname( requested_resource ) === '' )
                requested_resource = `${public_path}/index.html`

            const resource_ = requested_resource.replace( `${public_path}/`, '' )
            const resourceExt = extname( requested_resource )

            error = false
            outgoing.statusCode = 200
            outgoing.statusMessage = 'Ok'
            outgoing.setHeader( 'koorie.library', 'true' )
            buffer = javascript_library

            responseReady = true
            if( resource_ === '' )
                outgoing.setHeader( 'content-type', 'text/html' )

            if ( resource.images.includes( resourceExt ) ) {

                const imageContentType = resourceExt.replace( '.', '' )

                if ( imageContentType === 'svg' ) {
                    outgoing.setHeader(
                        'content-type',
                        `image/${ imageContentType }+xml` )

                } else {
                    outgoing.setHeader(
                        'content-type',
                        `image/${ imageContentType }` )
                }
            }

            if( resource.text.includes( resourceExt ) ) {

                let textContentType = resourceExt.replace( '.', '' )

                if( textContentType === 'js' || textContentType === 'mjs' )
                    textContentType = 'javascript'

                outgoing.setHeader(
                    'content-type',
                    `text/${ textContentType }` )
            }

            if( resource.application.includes( resourceExt ) ) {

                const appContentType = resourceExt.replace( '.', '' )

                outgoing.setHeader(
                    'content-type',
                    `application/${ appContentType }` )
            }

        }else if( javascript_library instanceof Error ){
            responseReady = false
            outgoing.statusCode = 404
            outgoing.statusMessage = 'Not Found'
            outgoing.setHeader( 'koorie.library', 'false' )
            error = javascript_library.message
        }

        const content_length = await buffer_( buffer ) === true ? Buffer.byteLength( buffer ) : 0
        const payload = await undefined_( buffer ) === true ? null: buffer
        const socket_active = await true_false( process.env.SOCKET_ACTIVE )
        const socket_path = process.env.SOCKET_PATH
        const secure_active = await true_false( process.env.SECURE )

        return new Promise( ( resolve, reject ) => {

            responseLog = responseLog = {
                worker: worker.id,
                date: worker.date,
                method: incoming.method,
                filename: basename( incoming.url ),
                url: incoming.url,
                incoming: {
                    length: incomingLength === null ? null : incomingLength,
                    payload:incomingPayload === null ? null : incomingPayload
                },
                message: outgoing.statusMessage,
                ip: incoming.socket.remoteAddress,
                code: outgoing.statusCode,
                headers: outgoing.getHeaders(),
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
                    path: socket_path
                }
            }

            if( responseReady === true )
                resolve( { buffer: buffer, log: responseLog } )

            else if( responseReady === false )
                reject( { log: responseLog } )

        } )
    },
} )

export default routing[ routingSymbol ]
