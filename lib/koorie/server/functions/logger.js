import { constants } from 'fs'
import { fork } from 'node:child_process'
import { koorie_log_write_pid } from '../../initialize.js'
import { undefined_ } from 'oftypes'
import { access, rm } from 'node:fs/promises'

export let koorie_log_write
/**
 * If the flag logger is not undefined set the ENVIRONMENT_VARIABLE LOGGER_QUIET & LOGGER:FILENAME.
 *
 * @param {{quiet:boolean, write:string|null}} flag - The --logger value.
 * @param {boolean} experimental_log_writer - --experimental-log-writer activated?
 */
export async function logger( flag, experimental_log_writer ){

    ( await undefined_( flag, {
        true: ( () => undefined ),
        false: ( async () => {
            const { quiet, write } = flag

            process.env.LOGGER_QUIET = quiet.toString()
            process.env.LOGGER_FILENAME = write

            if( write !== null && experimental_log_writer === true ) {

                if( process.env.FORKED !== 'true' ){

                    koorie_log_write = fork( './bin/koorie/log/write.js', {
                        stdio: [
                            'ignore',
                            process.stdout,
                            process.stderr,
                            'ipc',
                        ],
                    } )

                    koorie_log_write.on( 'spawn', async () => {
                        koorie_log_write_pid.pid = koorie_log_write.pid
                        process.env.EXPEXPERIMENTAL_LOG_WRITER_PID = koorie_log_write.pid.toString()
                        // Checks if the socket file already exists if exists will be deleted.
                        const socket_file = await access( '/tmp/koorie.log.writer.sock', constants.F_OK ).catch( error => error )
                        if( ! ( socket_file instanceof Error ) ) {
                            await rm( '/tmp/koorie.log.writer.sock' ).catch( error => {
                                console.error( error )
                                process.exit( 2 )
                            } )
                        }
                    } )
                    koorie_log_write.on( 'message', message => console.log( message ) )
                    koorie_log_write.on( 'exit', () => {console.log( 'koorie.log.write exited' )} )
                }

            }
        } )
    } ) )()
}
