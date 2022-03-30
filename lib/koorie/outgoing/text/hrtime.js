import { request_id, request_timing } from '../../dispatcher.js'

/**
 * A response_time text.
 *
 * @param {number} response_time - the calculated hr_time
 * @returns {string}
 */
export function hrtime_text( response_time ){
    return `${request_timing.underline().strong().green()}${ request_id.underline().strong().magenta() } ${'response time:'.green().strong()} ${response_time.toString().yellow()}${'ms'.red()}
`
}
