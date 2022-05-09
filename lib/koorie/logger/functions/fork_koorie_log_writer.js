import { fork } from 'node:child_process'
import { koorie_log_writer_pid } from '../../initialize.js'

export let koorie_log_writer

let klw_process
if ( await import.meta.resolve( 'koorie' ).catch( error => error ) instanceof Error )
    klw_process = './bin/koorie/log/writer/klw.js'
else klw_process = 'node_modules/koorie/./bin/koorie/log/writer/klw.js'

/**
 * Fork the writer.
 */
export function fork_koorie_log_writer(){
    koorie_log_writer = fork( klw_process, {
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
