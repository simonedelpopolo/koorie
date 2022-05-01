import { Blaze } from '@cli-blaze/decors'
import { request_id, request_timing } from '../../dispatcher.js'

/**
 * A response_time text.
 *
 * @param {number} response_time - the calculated hr_time
 * @returns {string}
 */
export function hrtime_text( response_time ){
    return `${Blaze.underline( Blaze.strong( Blaze.green( request_timing ) ) )}${ Blaze.underline( Blaze.strong( Blaze.magenta( request_id ) ) ) } ${Blaze.strong( Blaze.green( 'response time:' ) )} ${Blaze.yellow( response_time.toString() )}${Blaze.red( 'ms' )}
`
}
