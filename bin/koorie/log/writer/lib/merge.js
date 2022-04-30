import event from './event.js'
import { koorie_log_writer_recover } from './functions/recover.js'
import koorie_log_writer_write from './write.js'
import queue from './queue.js'

/**
 * Object [ binary.koorie.log.writer.merge ]
 * it listens for the 'read' event
 * it pushes the new request-data into the log_object-data
 * it double-checks the given log_data_object is correct
 * if NOT it calls koorie_log_writer_recover that writes a new log.json file
 *   and renames the old one appending '-read-error' to the filename.
 *
 * @fires 'merged'
 */
export default function koorie_log_writer_merge(){

    koorie_log_writer_write()
    event.on( 'read', async data => {

        let object_log_file = data[ 0 ]
        const key = data[ 1 ]
        try {
            if( ! ( Array.isArray( object_log_file ) ) )
                object_log_file = await koorie_log_writer_recover().catch( error => console.error( error ) )

            object_log_file.push( queue[ key ] )
            event.emit( 'merged', [ object_log_file, key ] )

        }catch ( error ) {
            console.error( error )
        }
    } )
}
