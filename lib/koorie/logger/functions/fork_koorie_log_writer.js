import { fork } from 'node:child_process'
import { koorie_log_writer_pid } from '../../initialize.js'

export let koorie_log_writer

/**
 * Fork the writer.
 */
export function fork_koorie_log_writer(){
    koorie_log_writer = fork( './bin/koorie/log/writer/klw.js', {
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
    } )

    koorie_log_writer.on( 'message', message => console.log( message ) )
    koorie_log_writer.on( 'exit', code => {
        console.log( 'koorie.log.writer exited with code ->', code )
        fork_koorie_log_writer()
    } )
}
