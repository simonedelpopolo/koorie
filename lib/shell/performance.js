import shell from '../shell.js'
import { socket_connect } from './socket.js'

export const performanceSymbol = Symbol( 'Object [ shell.performance ] koorie perf' )
export const performance = Object.defineProperty( shell, performanceSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Through socket connection to koorie, koorie-shell will get some performance.
     *
     * @param {{refresh_rate:number, socket_path: string}} options - on the fly options to koorie.
     * @returns {Promise<void>}
     */
    value: async function performance( options ) {
        
        const opts = Object.keys( options )
        let buffer
        
        for( const opts_ in opts ){
            
            // eslint-disable-next-line default-case
            switch ( opts[ opts_ ] ){
                case 'refresh_rate': {
                    
                    buffer = Buffer.from( JSON.stringify( { refresh_rate: options.refresh_rate, performance: true } ) )
                }
                    break
            }
        }
        
        socket_connect( buffer, { socket_path: options.socket_path }, 'performance' )
    }
} )
