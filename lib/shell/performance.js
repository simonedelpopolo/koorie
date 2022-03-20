import shell from '../shell.js'
import { socket_connect } from './socket/functions/socket_connect.js'

const performanceSymbol = Symbol( 'Object [ shell.performance ]' )
const performance = Object.defineProperty( shell, performanceSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ shell.performance ]
     * Socket connection to retrieve server stats.
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

export default performance[ performanceSymbol ]
