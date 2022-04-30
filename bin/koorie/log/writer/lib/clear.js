import event from './event.js'
import queue from './queue.js'

/**
 * Object [ binary.koorie.log.writer.clear ]
 * it listens for the 'wrote' event
 * removeAllListeners BEFORE deleting the processed queue key.
 */
export default function koorie_log_writer_clear() {

    event.on( 'wrote', key => {
        event.removeAllListeners()
        delete queue[ key ]
    } )

}
