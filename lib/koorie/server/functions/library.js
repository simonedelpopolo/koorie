import { undefined_ } from 'oftypes'

/**
 * If the flag library is not undefined set the ENVIRONMENT_VARIABLE LIBRARY.
 *
 * @param {string} flag - The --library value.
 */
export async function library( flag ){
    ( await undefined_( flag, { true: ( () => undefined ), false: ( () => process.env.LIBRARY = flag ) } ) )()
}
