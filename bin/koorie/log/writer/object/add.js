import { randomUUID } from 'crypto'
import {
    koorie_log_writer_event,
    koorie_log_writer_queue,
    koorie_log_writer_read,
    writer,
} from '../exporter.js'

const addSymbol = Symbol.for( 'Object [ binary.koorie.log.writer.add ]' )
const add = Object.defineProperty( writer, addSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ binary.koorie.log.writer.add ]
     * it populates the queue and begin the writing process.
     *
     * @param {Object} data - the new request data.
     * @fires 'add'
     */
    value: function koorie_log_writer_add( data ){
        koorie_log_writer_read()
        const request_id = randomUUID()
        koorie_log_writer_queue[ request_id ] = data
        koorie_log_writer_event.emit( 'added', request_id )
    },
} )

export default add[ addSymbol ]
