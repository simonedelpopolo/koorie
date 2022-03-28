import { undefined_ } from 'oftypes'

/**
 * If the flag no-listening-check is undefined set the ON_LISTENING_CHECK_REQUEST.
 *
 * @param {string} flag - The --no-listening-check value.
 */
export async function no_listening_check( flag ){
    ( await undefined_( flag, { true: ( () => process.env.ON_LISTENING_CHECK_REQUEST = 'true' ), false: ( () => undefined ) } ) )()
}
