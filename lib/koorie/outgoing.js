import koorie from '../koorie.js'
import { logger } from '../../index.js'
import { true_false } from 'boolean-jokes'
import { buffer_, object_ } from 'oftypes'
import { request_id, request_timing, time_ } from './initialize.js'

export const outgoingSymbol = Symbol( 'the server outgoing system' )
export const outgoing = Object.defineProperty( koorie, outgoingSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,
    /**
     *  Routing.
     *
     * @param {{buffer:Buffer, log:object}|Error} response - .
     * @param {ServerResponse} outgoing - .
     * @returns {Promise<void>}
     */
    value: async function outgoing( response, outgoing ){

        let response_time

        if( await buffer_( response.buffer ) ) {
            outgoing.write( response.buffer )
            outgoing.end()
            response_time = Number( process.hrtime.bigint() - time_ ) / 1_000_000

        }else if( await object_( response ) ) {
            outgoing.setHeader( 'content-type', 'application/json' )
            outgoing.write( Buffer.from( '{"error":"no route"}' ) )
            outgoing.end()
            response_time = Number( process.hrtime.bigint() - time_ ) / 1_000_000
        }

        response.log[ 'request/response' ] = {
            'request-id': request_id,
            'response-time': response_time,
        }

        if( await true_false( process.env.RESPONSE_TIME ) === true ) {

            let response_time_message = `${request_timing.underline().strong().green()}${ request_id.underline().strong().magenta() }`
            response_time_message += ' response time: '.green().strong()
            response_time_message += response_time.toString().yellow()
            response_time_message += 'ms\n'.red()

            process.stdout.write( response_time_message )
        }

        await logger( {
            quiet: await true_false( process.env.LOGGER_QUIET ),
            write: process.env.LOGGER_FILENAME === 'null' ? null : process.env.LOGGER_FILENAME,
            info: [ response.log ]
        } )
    }
} )
