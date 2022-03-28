import koorie from '../koorie.js'
import { logger } from '../../index.js'
import { process_hrtime } from './outgoing/process_hrtime.js'
import { true_false } from 'boolean-jokes'
import { buffer_, object_, oftype_ } from 'oftypes'
import { request_id, request_timing } from './dispatcher.js'

const outgoingSymbol = Symbol( 'Object [ koorie.outgoing ]' )
const outgoing = Object.defineProperty( koorie, outgoingSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,

    /**
     *  Object [ koorie.outgoing ].
     *
     * @param {{buffer:Buffer, log:Object}} response - the response to be given back.
     * @param {ServerResponse} Outgoing - ref to ServerResponse Object.
     * @returns {Promise<void>}
     */
    value: async function outgoing( response, Outgoing ){

        let response_time
        if( Outgoing.writableFinished ){
            if( process.env.SILENCED !== 'true' && !process.env.ON_LISTENING_CHECK_REQUEST )
                response_time = process_hrtime()

        }

        else if( await buffer_( response.buffer ) ) {

            Outgoing.write( response.buffer )
            Outgoing.end()
            if( process.env.SILENCED !== 'true' && !process.env.ON_LISTENING_CHECK_REQUEST )

                response_time = process_hrtime()


        }else if( await object_( response ) ) {
            Outgoing.setHeader( 'content-type', 'application/json' )
            Outgoing.write( Buffer.from( '{"error":"no route"}' ) )
            Outgoing.end()
            if( process.env.SILENCED !== 'true' && !process.env.ON_LISTENING_CHECK_REQUEST )

                response_time = process_hrtime()

        }

        if( await oftype_( response.log ) !== 'undefined' && process.env.SILENCED !== 'true' && !process.env.ON_LISTENING_CHECK_REQUEST ) {
            response.log[ 'request/response' ] = {
                'request-id': request_id,
                'response-time': response_time,
            }
        }

        if( await true_false( process.env.RESPONSE_TIME ) === true  && process.env.SILENCED !== 'true' && !process.env.ON_LISTENING_CHECK_REQUEST ) {

            let response_time_message = `${request_timing.underline().strong().green()}${ request_id.underline().strong().magenta() }`
            response_time_message += ' response time: '.green().strong()
            response_time_message += response_time.toString().yellow()
            response_time_message += 'ms\n'.red()

            process.stdout.write( response_time_message )
        }

        await logger( {
            quiet: await true_false( process.env.LOGGER_QUIET ),
            write: process.env.LOGGER_FILENAME === 'null' ? null : process.env.LOGGER_FILENAME,
            info: [ await response.log || response ]
        } )
    }
} )

export default outgoing[ outgoingSymbol ]
