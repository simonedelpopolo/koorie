import koorie from '../koorie.js'
import { worker } from './initialize.js'
import { access, readFile } from 'fs/promises'
import { basename, extname } from 'path'
import { body, domain, koorieIncoming, protocol, query, resource, routes } from '../../index.js'
import { buffer_, object_, undefined_ } from 'oftypes'

export let routingSymbol = Symbol( 'server url routing' )
export let routing = Object.defineProperty( koorie, routingSymbol, {
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
        
        // React application handler
        const { REACT } = process.env
    
        /**
         * Basically the url requested by the browser.
         *
         * @type {string}
         */
        let requested_resource = parameters.requested_resource
    
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
        const routesKeys = Object.keys( await routes.get() )
        const route = requested_resource.replace( `${public_path}/`, '' ).split( '/' )
        const routeUrl = `${await protocol.get()}${await domain.get()}${incoming.url}`
        
        // Looks for the route in the routes Object.
        if( routesKeys.includes( route[ 0 ] ) ){
            
            /**
             * @type {Buffer|{buffer:Buffer,incoming:{length:number,payload:Buffer}}}
             */
            let data
            // If a route has been found, calls the AsyncFunction of the route
            const routeAsyncFunction = await routes.get( route[ 0 ] )
            
            // The koorie.incoming.path is dynamic. needs to be static.
            // Find a way to register the post/get/delete/put
            route.splice( 0, 1 )
            
            await body( incoming )
            await query( routeUrl )
            
            if( route.length > 0 ){
                for ( const path in route ){
                    if( koorieIncoming.path.includes( route[ path ] ) === false )
                        koorieIncoming.path.push( route[ path ] )
                }
            }
            
            data = await routeAsyncFunction( incoming, outgoing, koorieIncoming ).catch( failed => failed )
            
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
        }else if( REACT === 'false' ){
            outgoing.statusCode = 404
            outgoing.statusMessage = 'Not Found'
            outgoing.setHeader( 'koorie-not-found', 'true' )
    
            error = 'no route no file found, missed the --react[r] flag?'
            responseReady = false
            
            // REACT KOORIE
        }else if( REACT === 'true' ){
            
            if( extname( requested_resource ) === '' )
                requested_resource = `${public_path}/index.html`
            
            const resource_ = requested_resource.replace( `${public_path}/`, '' )
            const resourceExt = extname( requested_resource )
    
            if( resource_ === '' )
                requested_resource = `${public_path}/index.html`
            
            error = await access( requested_resource ).catch( error => error )

            if( await undefined_( error ) === false ){
                responseReady = false
                outgoing.statusCode = 404
                outgoing.statusMessage = 'Not Found'
                outgoing.setHeader( 'koorie-react', 'false' )
            }else{
                
                error = false
                await readFile( requested_resource )
        
                    .then( bufferReadFile => {
            
                        outgoing.statusCode = 200
                        outgoing.statusMessage = 'Ok'
                        outgoing.setHeader( 'koorie-files', 'true' )
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
            
                        buffer = bufferReadFile
                        responseReady = true
                    } )
            }
            
        }
        
        const content_length = await buffer_( buffer ) === true ? Buffer.byteLength( buffer ) : 0
        const payload = await undefined_( buffer ) === true ? null: buffer
        
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
                error: error
            }
            
            if( responseReady === true )
                resolve( { buffer: buffer, log: responseLog } )
            
            else if( responseReady === false )
                reject( { log: responseLog } )
            
        } )
    },
} )
