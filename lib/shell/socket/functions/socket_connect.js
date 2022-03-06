import { createConnection } from 'node:net'
import { EventEmitter } from 'events'
import { is_json, parse } from 'json-swiss-knife'

const Emitter = new EventEmitter()
/**
 * Socket connection to koorie.
 *
 * @param {string|Buffer} data - .
 * @param {{[p:string]: any}} options - .
 * @param {string} api - target api.
 */
export function socket_connect( data, options, api ){
    
    const client = createConnection( { path:options.socket_path }, () => {
        client.write( data )
    } )
    
    let stream = []
    
    Emitter.on( 'stream', async stream_ => {
        
        if( await is_json( stream_[ 0 ] ) )
            console.log( await parse( stream_[ 0 ] ) )
        else
            console.log( stream_[ 0 ] )
        
    }  )
    
    client.on( 'data', ( data ) => {
        
        // eslint-disable-next-line default-case
        switch( api ){
            case 'set':
                stream.push( data.toString() )
                Emitter.emit( 'stream', stream )
                stream = []
                client.end()
                break
            case 'performance':
                
                stream.push( data.toString() )
                Emitter.emit( 'stream', stream )
                stream = []
                break
        }
    } )
    
    process.on( 'SIGINT', () => {
        process.stdout.write( '\r' )
        client.end()
    } )
    
    client.on( 'error', error => console.log( error ) )
}
