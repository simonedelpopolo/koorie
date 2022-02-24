import { undefined_ } from 'oftypes'

/**
 * If the flag address is not undefined set the ENVIRONMENT_VARIABLE ADDRESS.
 *
 * @param {string} flag - The --address[-a] value.
 */
export async function address( flag ){
    ( await undefined_( flag, { true: ( () => undefined ), false: ( () => process.env.ADDRESS = flag ) } ) )()
}
