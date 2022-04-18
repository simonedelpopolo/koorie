import { constants } from 'fs'
import { dirname } from 'path'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { fork_koorie_log_writer } from '../../logger/functions/fork_koorie_log_writer.js'
import { access, mkdir, open, writeFile } from 'node:fs/promises'
import { oftype_, resolvers, undefined_ } from 'oftypes'

/**
 * Object [ koorie.server.functions.logger ]
 * If the flag logger is not undefined set the ENVIRONMENT_VARIABLE LOGGER_QUIET & LOGGER:FILENAME.
 *
 * @param {{quiet:boolean, write:string|null}} flag - The --logger value.
 * @param {boolean} experimental_log_writer - --experimental-log-writer activated?
 */
export async function logger( flag, experimental_log_writer ){

    const truthy = () => undefined
    const falsy = async () => {

        const { quiet, write } = flag

        process.env.LOGGER_QUIET = quiet.toString()
        process.env.LOGGER_FILENAME = write

        if( await oftype_( write ) !== 'null' ) {

            if( await oftype_( write ) === 'String' ){
                if ( experimental_log_writer && process.env.FORKED !== 'true' )
                    fork_koorie_log_writer()

                /**
                 * Check directories permissions for the specified path
                 */
                let error = await access(
                    dirname( write ),
                    constants.W_OK ||
                    constants.X_OK ||
                    constants.R_OK ||
                    constants.F_OK,
                )
                    .catch( error => error )

                if ( error instanceof Error ) {
                    // - EACCES error stop the server booting
                    if ( error.code === 'EACCES' )
                        await exit( error.message, new Error( '[koorie.logger] permissions' ), error_code.INTERNAL )

                    // - in case the directory doesn't exist it will be made.
                    await mkdir( dirname( write ), { recursive: true, mode: 0o755 } )
                }

                // - if the file doesn't exist it will be written
                // - empty if the experimental_log_writer is NOT active
                // - in the form of JSON with one empty array, that will be the container of all the logged requests.
                error = await access( write, constants.F_OK ).catch( error => error )
                if ( error instanceof Error ) {

                    if ( experimental_log_writer ) {
                        await writeFile( write, `${ JSON.stringify( [] ) }` )
                            .catch( async error => exit( '[koorie.logger] writeFile error', error, error_code.INTERNAL ) )
                    } else {
                        process.env.LOGGER_FILENAME = `${ write }.log`

                        /**
                         * @type {FileHandle | void}
                         */
                        const log_file = await open( `${ write }.log`, 'w' )
                            .catch( async error => exit( '[koorie.logger] open error', error, error_code.INTERNAL ) )
                        await log_file.close()
                    }
                }
            }
            else
                await exit( `given flag for the write option has not the right type: <oftype>${write}`, new Error( '[koorie.logger] flags-error' ), error_code.FLAG )

        }
    };

    ( await undefined_( flag, await resolvers( truthy, falsy ) ) )()
}
