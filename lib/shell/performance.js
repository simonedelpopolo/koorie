import { socket_connect } from './socket/functions/socket_connect.js'

/**
 * Object [ shell.performance ]
 * Socket connection to retrieve server stats.
 *
 * @param {{refresh_rate:number, socket_path: string}} options - on the fly options to koorie.
 * @returns {Promise<void>}
 */
export default async function performance( options ) {

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
