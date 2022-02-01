import koorie from '../koorie.js'
import { worker } from './initialize.js'
import { access, readFile } from 'fs/promises'
import { basename, extname } from 'path'
import { logger, routes } from '../../index.js'
import { object_, undefined_ } from 'oftypes'
import { resource, resourceSymbol } from './resource.js'

const imageExtList = [
    '.png',
    '.webp',
    '.jpeg',
    '.ico',
    '.bmp',
    '.svg',
]

const textExt = [
    '.css',
    '.htm',
    '.html',
    '.mjs',
    '.js',
]

const appExt = [
    '.json',
]

let bufferRead
let responseReady
let responseLog

export let dispatcherSymbol = Symbol( 'Server requests/responses dispatcher' )
export let dispatcher = Object.defineProperty( koorie, dispatcherSymbol, {
    enumerable: true,
    writable:false,
    configurable: false,
    
    value: async function dispatcher( parameters ){
    
        const { react } = process.env
        const public_path = resource[ resourceSymbol ]
        const outgoing = parameters.server.outgoing
        const incoming = parameters.server.incoming
        let requested_resource = parameters.requested_resource
        
        const routesKeys = Object.keys( routes )
        const route = requested_resource.replace( `${public_path}/`, '' )
        
        if( routesKeys.includes( route ) ){
            
            const data = await routes[ route ]( parameters.server.incoming, parameters.server.outgoing  ).catch( failed => failed )
        
            let buffer
            let incomingLength = null
            let incomingPayload = null
        
            if( Buffer.isBuffer( data ) )
                buffer = data
            else if( await object_( data ) === true ){
                
                buffer = data.buffer
                if( await undefined_( data.incoming ) === false ){
                    if( await undefined_( data.incoming.length ) === false && await undefined_( data.incoming.payload ) === false ){
                        incomingLength = data.incoming.length
                        incomingPayload = data.incoming.payload
                    }
        
                }
            }
            
            bufferRead = buffer
            responseLog = {
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
                code: outgoing.statusCode,
                headers: outgoing.getHeaders(),
                'content-length': Buffer.byteLength( buffer ),
                payload: buffer
            }
            responseReady = true
            
            // NOT FOUND API KOORIE
        }else if( react === 'false' ){
            outgoing.statusCode = 404
            outgoing.statusMessage = 'Not Found'
            outgoing.setHeader( 'koorie-index', 'false' )
    
            logger( { quiet: false, info: [ {
                worker: worker.id,
                date: worker.date,
                method: incoming.method,
                filename: basename( incoming.url ),
                url: incoming.url,
                message: outgoing.statusMessage,
                code: outgoing.statusCode,
                headers: outgoing.getHeaders(),
                file: requested_resource,
                errorMessage: 'no route no file found, missed the --react[r] flag?',
            } ] } )
    
            outgoing.end()
            responseReady = false
            
            // REACT KOORIE
        }else if( react === 'true' ){
            
            if( extname( requested_resource ) === '' )
                requested_resource = `${public_path}/index.html`
    
    
            const resource = requested_resource.replace( `${public_path}/`, '' )
            const resourceExt = extname( requested_resource )
    
            if( resource === '' )
                requested_resource = `${public_path}/index.html`
    
            let bufferByteLength
            
            await access( requested_resource )
                .catch( error => {
                    
                    responseReady = false
                    outgoing.statusCode = 404
                    outgoing.statusMessage = 'Not Found'
                    outgoing.setHeader( 'koorie-index', 'false' )
    
                    logger( { quiet: false, info: [ {
                        worker: worker.id,
                        date: worker.date,
                        method: incoming.method,
                        filename: basename( incoming.url ),
                        url: incoming.url,
                        message: outgoing.statusMessage,
                        code: outgoing.statusCode,
                        headers: outgoing.getHeaders(),
                        file: requested_resource,
                        errorMessage: error.message,
                    } ] } )
                    
                    outgoing.end()
        
                } )
                .then( async() => {
                    await readFile( requested_resource )
        
                        .then( buffer => {
            
                            bufferByteLength = Buffer.byteLength( buffer )
            
                            outgoing.statusCode = 200
                            outgoing.setHeader( 'koorie-files', 'true' )
                            if( resource === '' )
                                outgoing.setHeader( 'content-type', 'text/html' )
            
                            if ( imageExtList.includes( resourceExt ) ) {
                
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
            
                            if( textExt.includes( resourceExt ) ) {
                
                                let textContentType = resourceExt.replace( '.', '' )
                
                                if( textContentType === 'js' || textContentType === 'mjs' )
                                    textContentType = 'javascript'
                
                                outgoing.setHeader(
                                    'content-type',
                                    `text/${ textContentType }` )
                            }
            
                            if( appExt.includes( resourceExt ) ) {
                
                                const appContentType = resourceExt.replace( '.', '' )
                
                                outgoing.setHeader(
                                    'content-type',
                                    `application/${ appContentType }` )
                            }
            
                            bufferRead = buffer
                            responseReady = true
                            responseLog = {
                                worker: worker.id,
                                date: worker.date,
                                method: incoming.method,
                                filename: basename( incoming.url ),
                                url: incoming.url,
                                message: outgoing.statusMessage,
                                code: outgoing.statusCode,
                                headers: outgoing.getHeaders(),
                                'content-length': bufferByteLength,
                            }
                        } )
                } )
            
        }
        
        return new Promise( ( resolve, reject ) => {
        
            if( responseReady === true ) {
                resolve( {
                    buffer: bufferRead,
                    log: responseLog
                } )
            }
            
            else if( responseReady === false )

                reject( { buffer: null, log: responseLog } )
            
        } )
    },
} )
