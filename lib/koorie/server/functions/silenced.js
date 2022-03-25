import { undefined_ } from 'oftypes'

/**
 * If the flag silenced is not undefined set the ENVIRONMENT_VARIABLE SILENCED.
 *
 * @param {boolean} flag - The --silenced value.
 */
export async function silenced( flag ){
    ( await undefined_( flag, { true: ( () => undefined ), false: ( () => process.env.SILENCED = flag ) } ) )()
}
