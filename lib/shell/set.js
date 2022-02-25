import { createConnection } from 'node:net'
import shell from '../shell.js'

/**
 * Socket connection to koorie.
 *
 * @param {string|Buffer} data - .
 * @param {{[p:string]: any}} options - .
 */
function socket_connect( data, options ){
    // - todo pass the socket path flag
    const client = createConnection( { path:options.socket_path }, () => {
        client.write( 'data' )
    } )
    
    client.on( 'data', ( data ) => {
        console.log( data.toString() )
        client.end()
    } )
    
    client.on( 'error', error => console.log( error ) )
}

export const setSymbol = Symbol( 'Object [ shell.set ] on the run koorie settings' )
export const set = Object.defineProperty( shell, setSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Through socket connection to koorie, koorie-shell can edit some koorie options without restarting it.
     *
     * @param {{hot:string, inject:string, socket_path:string}} options - on the fly options to set into koorie.
     * @returns {Promise<void>}
     */
    value: async function set( options ) {
        
        const opts = Object.keys( options )
        let buffer
        
        for( const opts_ in opts ){
    
            // eslint-disable-next-line default-case
            switch ( opts[ opts_ ] ){
                case 'hot': {
                    
                    buffer = Buffer.from( JSON.stringify( { HOT: options.hot } ) )
                }
                    break
            }
        }
        
        socket_connect( buffer, { socket_path: options.socket_path } )
        
    
    }
} )
