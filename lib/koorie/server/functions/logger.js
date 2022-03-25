import { undefined_ } from 'oftypes'

/**
 * If the flag logger is not undefined set the ENVIRONMENT_VARIABLE LOGGER_QUIET & LOGGER:FILENAME.
 *
 * @param {{quiet:boolean, write:string}} flag - The --logger value.
 */
export async function logger( flag ){

    ( await undefined_( flag, {
        true: ( () => undefined ),
        false: ( () => {
            const { quiet, write } = flag

            process.env.LOGGER_QUIET = quiet.toString()
            process.env.LOGGER_FILENAME = write
        } )
    } ) )()
}
