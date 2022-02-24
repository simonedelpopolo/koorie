import { undefined_ } from 'oftypes'

/**
 * If the flag hot is not undefined set the ENVIRONMENT_VARIABLE HOT.
 *
 * @param {string} flag - The --hot value.
 */
export async function hot ( flag ){
    ( await undefined_( flag, { true: ( () => undefined ), false: ( () => process.env.HOT = flag.toString() ) } ) )()
}
