import { buffer_ } from 'oftypes'
import koorie from '../koorie.js'
import { logger } from '../../index.js'
import { process_hrtime } from './outgoing/process_hrtime.js'
import { request_id } from './dispatcher.js'
import { routing_log } from './routing.js'
import { true_false } from 'boolean-jokes'

const outgoingSymbol = Symbol( 'Object [ koorie.outgoing ]' )
const outgoing = Object.defineProperty( koorie, outgoingSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,

    /**
     *  Object [ koorie.outgoing ].
     *
     * @param {Promise<buffer|undefined>|buffer|undefined} response - the response to be given back.
     * @param {ServerResponse} Outgoing - ref to ServerResponse Object.
     * @returns {Promise<void> | void}
     */
    value: async function outgoing( response, Outgoing ){

        // - routing_log is a Promise!
        let log = await routing_log
        let response_time = process_hrtime()
        let response_time_active = await true_false( process.env.RESPONSE_TIME )
        let silenced =  await true_false( process.env.SILENCED )
        let quiet = await true_false( process.env.LOGGER_QUIET )
        let log_filename = process.env.LOGGER_FILENAME === 'null' ? null : process.env.LOGGER_FILENAME

        // - if response is NOT already sent with Outgoing.end() somewhere else.
        if( ! Outgoing.writableEnded ) {

            // - the response is always buffer - if NOT sent an internal-error as response.
            if( await buffer_( response ) )
                Outgoing.end( response )

            // - this case shall not happen so frequently (maybe never) but in case needs investigation.
            else {
                Outgoing.statusCode = 500
                Outgoing.end( '{"internal":"error"}' )
            }
        }

        if( ! silenced && !process.env.ON_LISTENING_CHECK_REQUEST ) {

            log[ 'request/response' ] = {
                'request-id': request_id,
                'response-time': response_time,
            }

            if( response_time_active )
                console.log( process_hrtime( true, response_time ) )
        }

        // - going to add some useful options in addiction to the required 'quiet' & 'write' when --logger is invoked
        await logger( {
            quiet: quiet,
            write: log_filename,
            info: [ log || response ]
        } )
    }
} )

export default outgoing[ outgoingSymbol ]
