import { undefined_ } from 'oftypes'

/**
 * If the flag port is not undefined set the ENVIRONMENT_VARIABLE PORT.
 *
 * @param {number} flag - The --port[-p] value.
 */
export async function port( flag ) {

    ( await undefined_( flag, {
        true: ( () => undefined ),
        false: ( () => {
            if ( flag !== 0 )
                process.env.PORT = flag.toString()
        } ),
    }
    ) )()
}
