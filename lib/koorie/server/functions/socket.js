import { undefined_ } from 'oftypes'

/**
 * If the flag logger is not undefined set the ENVIRONMENT_VARIABLE LOGGER_QUIET & LOGGER:FILENAME.
 *
 * @param {{active:boolean, path:string}} flag - The --logger[-l] value.
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
