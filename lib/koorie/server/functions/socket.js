import { undefined_ } from 'oftypes'

/**
 * If the flag socket is not undefined set the ENVIRONMENT_VARIABLE SOCKET_ACTIVE & SOCKET_PATH.
 *
 * @param {{active:boolean, path:string}} flag - The --socket[-sk] value.
 */
export async function socket( flag ){

    ( await undefined_( flag, {
        true: ( () => undefined ),
        false: ( () => {
            const { active, path } = flag

            process.env.SOCKET_ACTIVE = active.toString()
            process.env.SOCKET_PATH = path
        } )
    } ) )()
}
