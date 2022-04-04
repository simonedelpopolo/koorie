import { constants } from 'fs'
import { dirname } from 'path'
import { fork } from 'node:child_process'
import { koorie_log_writer_pid } from '../../initialize.js'
import { access, mkdir, open, rm, writeFile } from 'node:fs/promises'
import { oftype_, resolvers, undefined_ } from 'oftypes'
import { process_exit, shell_exit_codes } from '../../../../index.js'

export let koorie_log_writer
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
                        await process_exit( error.message, new Error( '[koorie.logger] permissions' ), shell_exit_codes.internal )

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
                            .catch( async error => process_exit( '[koorie.logger] writeFile error', error, shell_exit_codes.internal ) )
                    } else {
                        process.env.LOGGER_FILENAME = `${ write }.log`
                        const log_file = await open( `${ write }.log`, 'w' )
                            .catch( async error => process_exit( '[koorie.logger] open error', error, shell_exit_codes.internal ) )
                        log_file.close()
                    }
                }
            }
            else
                await process_exit( `given flag for the write option has not the right type: <oftype>${write}`, new Error( '[koorie.logger] flags-error' ), shell_exit_codes.flags )

        }
    };

    ( await undefined_( flag, await resolvers( truthy, falsy ) ) )()
}

/**
 * Fork the writer.
 */
function fork_koorie_log_writer(){
    koorie_log_writer = fork( './bin/koorie/log/writer/executable.js', {
        stdio: [
            'ignore',
            process.stdout,
            process.stderr,
            'ipc',
        ],
    } )

    koorie_log_writer.on( 'spawn', async () => {
        koorie_log_writer_pid.pid = koorie_log_writer.pid
        process.env.EXPEXPERIMENTAL_LOG_WRITER_PID = koorie_log_writer.pid.toString()
        // Checks if the socket file already exists if exists will be deleted.
        const socket_file = await access( '/tmp/koorie.log.writer.sock', constants.F_OK ).catch( error => error )
        if( ! ( socket_file instanceof Error ) ) {
            await rm( '/tmp/koorie.log.writer.sock' ).catch( error => {
                console.error( error )
                process.exit( 2 )
            } )
        }
    } )

    koorie_log_writer.on( 'message', message => console.log( message ) )
    koorie_log_writer.on( 'exit', code => {
        console.log( 'koorie.log.write exited' )
        console.trace( code )
        fork_koorie_log_writer()
    } )
}

