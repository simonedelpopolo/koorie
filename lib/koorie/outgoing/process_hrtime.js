import { hrtime_text } from './text/hrtime.js'
import { time_ } from '../dispatcher.js'

/**
 * Object [ koorie.outgoing.functions.process_hrtime ]
 * return the execution time until the response is sent.
 *
 * @param {boolean} [message=false] - response-time message
 * @param {undefined|number} [response_time=undefined] - the calculated hr_time
 * @returns {string|number}
 */
export function process_hrtime( message = false, response_time = undefined ){

    if( message )
        return hrtime_text( response_time )

    return Number( process.hrtime.bigint() - time_ ) / 1_000_000
}
