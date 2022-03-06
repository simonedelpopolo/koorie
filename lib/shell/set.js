import shell from '../shell.js'
import { socket_connect } from './socket/functions/socket_connect.js'

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
        
        socket_connect( buffer, { socket_path: options.socket_path }, 'set' )
    
    }
} )
