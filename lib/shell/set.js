import { socket_connect } from './socket/functions/socket_connect.js'

/**
 * Object [ shell.set ]
 * Through socket connection to koorie,
 * koorie-shell can set/unset options without restarting the server
 * this is because most of the options are ENVIRONMENT_VARIABLES.
 *
 * @param {{hot:string, socket_path:string}} options - on the fly options to set/unset
 * @returns {Promise<void> | void}
 */
export default async function set( options ) {

    let buffer
    const optionsKeys = Object.keys( options )

    for( const option in optionsKeys ){

        // eslint-disable-next-line default-case
        switch ( optionsKeys[ option ] ){
            case 'hot': {

                buffer = Buffer.from( JSON.stringify( { hot: options.hot } ) )
            }
                break
        }
    }

    socket_connect( buffer, { socket_path: options.socket_path }, 'set' )

}
