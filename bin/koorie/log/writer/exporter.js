export { default as writer } from './writer.js'
import { default as koorie_log_writer_add__ } from './object/add.js'
import { default as koorie_log_writer_clear__ } from './object/clear.js'
import { default as koorie_log_writer_entry_point__ } from './object/entry_point.js'
import { default as koorie_log_writer_event__ } from './object/event.js'
import { default as koorie_log_writer_merge__ } from './object/merge.js'
import { default as koorie_log_writer_queue__ } from './object/queue.js'
import { default as koorie_log_writer_read__ } from './object/read.js'
import { default as koorie_log_writer_write__ } from './object/write.js'

/**
 * @type {EventEmitter}
 */
export const koorie_log_writer_event = koorie_log_writer_event__

/**
 * Object [ binary.koorie.log.writer.clear ]
 * it listens for the 'wrote' event
 * removeAllListeners BEFORE deleting the processed queue key.
 *
 * @returns {*}
 */
export function koorie_log_writer_clear(){
    return koorie_log_writer_clear__()
}

/**
 * Object [ binary.koorie.log.writer.queue ]
 * object container for the processing queue
 *
 * @type {Object}
 */
export const koorie_log_writer_queue = koorie_log_writer_queue__

/**
 * Object [ binary.koorie.log.writer.write ]
 * it listens for the 'merged' event
 * it writes the new data to the log.json file.
 *
 * @fires 'wrote'
 * @returns {*}
 */
export function koorie_log_writer_write(){
    return koorie_log_writer_write__()
}

/**
 * Object [ binary.koorie.log.writer.read ]
 * it listens for the 'added' event
 * it reads the data from the log.json file
 * it parses the read data to object
 * it checks the given data is correct
 * if NOT it calls koorie_log_writer_recover that writes a new log.json file
 *   and renames the old one appending '-read-error' to the filename.
 *
 * @fires 'read'
 * @returns {*}
 */
export function koorie_log_writer_read(){
    return koorie_log_writer_read__()
}

/**
 * Object [ binary.koorie.log.writer.add ]
 * it populates the queue and begin the writing process.
 *
 * @fires 'add'
 * @returns {*}
 */
export function koorie_log_writer_add(){
    return koorie_log_writer_add__()
}

/**
 * Object [ binary.koorie.log.writer.merge ]
 * it listens for the 'read' event
 * it pushes the new request-data into the log_object-data
 * it double-checks the given log_data_object is correct
 * if NOT it calls koorie_log_writer_recover that writes a new log.json file
 *   and renames the old one appending '-read-error' to the filename.
 *
 * @fires 'merged'
 * @returns {*}
 */
export function koorie_log_writer_merge(){
    return koorie_log_writer_merge__()
}

/**
 * Object [ binary.koorie.log.writer.entry_point ]
 * it checks for log.json file size, if it exceeds the 250_000bytes writes a new log.json file
 * the old one is copied to a new file with Date.now() appended to the filename.
 *
 * @param {{filename:string, log: Object}} logger - the data receive through IPC
 * @returns {*}
 */
export function koorie_log_writer_entry_point( logger ){
    return koorie_log_writer_entry_point__( logger )
}
