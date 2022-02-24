import { undefined_ } from 'oftypes'

/**
 * If the flag protocol is not undefined set the ENVIRONMENT_VARIABLE PROTOCOL.
 *
 * @param {string} flag - The --protocol[-pr] value.
 */
export async function protocol( flag ){
    ( await undefined_( flag, { true: ( () => undefined ), false: ( () => process.env.PROTOCOL = flag ) } ) )()
}
