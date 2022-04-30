import event from './event.js'
import koorie_log_writer_read from './read.js'
import queue from './queue.js'
import { randomUUID } from 'crypto'

/**
 * Object [ binary.koorie.log.writer.add ]
 * it populates the queue and begin the writing process.
 *
 * @param {Object} data - the new request data.
 * @fires 'add'
 */
export default function koorie_log_writer_add( data ){
    koorie_log_writer_read()
    const request_id = randomUUID()
    queue[ request_id ] = data
    event.emit( 'added', request_id )
}
