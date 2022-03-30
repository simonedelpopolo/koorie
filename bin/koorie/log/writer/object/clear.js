import { default as writer } from '../writer.js'
import {
    koorie_log_writer_event,
    koorie_log_writer_queue
} from '../exporter.js'

const clearSymbol = Symbol.for( 'Object [ binary.koorie.log.writer.clear ]' )
const clear = Object.defineProperty( writer, clearSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ binary.koorie.log.writer.clear ]
     * it listens for the 'wrote' event
     * removeAllListeners BEFORE deleting the processed queue key.
     */
    value: function koorie_log_writer_clear() {

        koorie_log_writer_event.on( 'wrote', key => {
            koorie_log_writer_event.removeAllListeners()
            delete koorie_log_writer_queue[ key ]
        } )

    }
} )

export default clear[ clearSymbol ]
