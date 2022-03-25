import { undefined_ } from 'oftypes'

/**
 * If the flag response_time is not undefined set the ENVIRONMENT_VARIABLE RESPONSE_TIME.
 *
 * @param {string} flag - The --response-time value.
 */
export async function response_time( flag ){
    ( await undefined_( flag, {
        true: ( () => undefined ),
        false: ( () => {process.env.RESPONSE_TIME = flag} )
    } ) )()
}
