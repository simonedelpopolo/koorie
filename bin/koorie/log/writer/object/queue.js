import { writer } from '../exporter.js'

const queueSymbol = Symbol.for( 'Object [ binary.koorie.log.writer.queue ]' )
const queue = Object.defineProperty( writer, queueSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ binary.koorie.log.writer.queue ]
     * object container for the processing queue
     *
     * @type {Object}
     */
    value: {},
} )

export default queue[ queueSymbol ]
