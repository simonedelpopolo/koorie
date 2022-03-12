import { undefined_ } from 'oftypes'

/**
 * If the flag secure is not undefined set the ENVIRONMENT_VARIABLE SECURE, SECURE_KEY, SECURE_CERT & PROTOCOL.
 *
 * @param {{active:boolean, key:string, cert:string, dhparam:string|null}} flag - The --secure value.
 */
export async function secure( flag ){

    ( await undefined_( flag, {
        true: ( () => undefined ),
        false: ( () => {
            const { active, key, cert, dhparam } = flag

            process.env.SECURE = active.toString()
            process.env.SECURE_KEY = key.toString()
            process.env.SECURE_CERT = cert.toString()
            process.env.SECURE_DHPARAM = dhparam.toString()
            process.env.PROTOCOL = 'https'
        } )
    } ) )()
}
