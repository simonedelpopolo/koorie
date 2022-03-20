import { undefined_ } from 'oftypes'

/**
 * If the flag ejected is not undefined set the ENVIRONMENT_VARIABLE EJECTED.
 *
 * @param {string} flag - The --ejected value.
 */
export async function ejected( flag ){
    return ( await undefined_( flag, { true: ( () => undefined ),
        false: ( () => {
            process.env.EJECTED = 'true'
            process.env.EJECTED_FILE = flag

            return flag
        } )
    } ) )()
}
