import { undefined_ } from 'oftypes'

/**
 * If the flag http2 is not undefined set the ENVIRONMENT_VARIABLE HTTP2.
 *
 * @param {boolean} flag - The --http2 value.
 */
export async function http2( flag ){
    ( await undefined_( flag, { true: ( () => undefined ), false: ( () => process.env.HTTP2 = flag.toString() ) } ) )()
}
