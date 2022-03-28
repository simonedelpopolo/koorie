import { time_ } from '../dispatcher.js'

/**
 * Object [ koorie.outgoing.functions.process_hrtime ]
 * return the execution time until the response is sent.
 *
 * @returns {number}
 */
export function process_hrtime(){
    return Number( process.hrtime.bigint() - time_ ) / 1_000_000
}
