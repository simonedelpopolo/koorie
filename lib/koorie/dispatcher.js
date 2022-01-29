import { access } from 'fs/promises'
import { constants } from 'fs'
import { EventEmitter } from 'events'
import { readFile } from 'fs/promises'
import koorie from '../koorie.js'
import { worker } from './initialize.js'
import { basename, extname } from 'path'
import { code200, code404, routes } from '../../index.js'
import { object_, undefined_ } from 'oftypes'
import { public_path as p, public_pathSymbol } from './public_path.js'

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

export const dispatcherEvent = new EventEmitter()

export let dispatcherSymbol = Symbol( 'Server requests/responses dispatcher' )
export let dispatcher = Object.defineProperty( koorie, dispatcherSymbol, {
    enumerable: true,
    
    async set( parameters ) {
        
        const public_path = p[ public_pathSymbol ]
        const incoming = parameters.server.incoming
        const outgoing = parameters.server.outgoing
        let requested_resource = parameters.requested_resource
        
        const routesKeys = Object.keys( routes )
        
        if( routesKeys.includes( requested_resource.replace( `${public_path}/`, '' ) ) ){
            
            const data = await routes[ routesKeys ]( parameters.server.incoming, parameters.server.outgoing  ).catch( failed => failed )
            
            let buffer
            let incomingLength = null
            let incomingPayload = null
            
            if( await object_( data ) === true ) {
                buffer = data.buffer
                
                if( await undefined_( data.incoming ) === false ){
                    if( await undefined_( data.incoming.length ) === false && await undefined_( data.incoming.payload ) === false ){
                        incomingLength = data.incoming.length
                        incomingPayload = data.incoming.payload
                    }
        
                }
            }else
                buffer = data
            
            dispatcherEvent.emit( 'koorie', {
                buffer: buffer,
                error: false
            } )
            
            dispatcherEvent.emit( 'api', {
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
            } )
            
            outgoing.end()
            
            return
        }
        
        if( extname( requested_resource ) === '' )
            requested_resource = `${public_path}/index.html`
        
        access( requested_resource, constants.F_OK | constants.R_OK )
            
            .then( async () => {
                
                const resource = requested_resource.replace( `${public_path}/`, '' )
                const resourceExt = extname( requested_resource )
                
                if( resource === '' )
                    requested_resource = `${public_path}/index.html`
    
                let bufferByteLength
                await readFile( requested_resource )
                    .then( buffer => {
            
                        outgoing.statusCode = code200
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
            
                        bufferByteLength = Buffer.byteLength( buffer )
                        
                        dispatcherEvent.emit( 'read', {
                            buffer: buffer,
                            error: false
                        } )
                    } )
    
                dispatcherEvent.emit( 'ready', {
                    worker: worker.id,
                    date: worker.date,
                    method: incoming.method,
                    filename: basename( incoming.url ),
                    url: incoming.url,
                    message: outgoing.statusMessage,
                    code: outgoing.statusCode,
                    headers: outgoing.getHeaders(),
                    'content-length': bufferByteLength,
                } )
                
            } )
            
            .catch( error => {
                
                outgoing.statusCode = code404
                outgoing.statusMessage = 'Not Found'
                outgoing.setHeader( 'koorie-index', 'false' )
                
                dispatcherEvent.emit( 'error', {
                    worker: worker.id,
                    date: worker.date,
                    method: incoming.method,
                    filename: basename( incoming.url ),
                    url: incoming.url,
                    message: outgoing.statusMessage,
                    code: outgoing.statusCode,
                    headers: outgoing.getHeaders(),
                    file: requested_resource,
                    error: true,
                    errorMessage: error.message,
                } )
            } )
    },
} )
