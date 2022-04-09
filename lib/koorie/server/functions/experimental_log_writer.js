import { exit } from '@cli-blaze/activity'
import { resolvers, undefined_ } from 'oftypes'

/**
 * If the flag experimental-log-writer is NOT undefined
 * - check if process.env.LOGGER_FILENAME is not **"null"**
 * - activate the functionality
 * - otherwise process_exit.
 *
 * @param {boolean} flag - The --experimental-log-writer value.
 * @param {undefined|Object} logger_flag - --logger_flag options
 */
export async function experimental_log_writer( flag, logger_flag ){

    const truthy = () => undefined
    const falsy = async () => {

        if( !logger_flag )
            await exit( 'the --experimental-log-write require --logger=\'options(write:/path/to/file.log.json)\'' )

        const { write } = logger_flag
        if( write === null )
            await exit( 'the --experimental-log-write require --logger=\'options(write:/path/to/file.log.json)\'' )

        process.env.EXPERIMENTAL_LOG_WRITER = 'active'
    }

    ( await undefined_( flag, await resolvers( truthy, falsy ) ) )()
}
