import event from './event.js'
import koorie_log_writer_clear from './clear.js'
import { koorie_log_writer_filename } from './entry_point.js'
import { writeFileSync } from 'node:fs'

/**
 * Object [ binary.koorie.log.writer.write ]
 * it listens for the 'merged' event
 * it writes the new data to the log.json file.
 *
 * @fires 'wrote'
 */
export default function koorie_log_writer_write(){

    koorie_log_writer_clear()
    event.on( 'merged', data => {

        const merged = data[ 0 ]
        const key = data[ 1 ]

        try{
            writeFileSync( koorie_log_writer_filename, JSON.stringify( merged ), { flag: 'w' } )
            event.emit( 'wrote', key )

        }catch( error ){
            console.error( error )
        }
    } )
}
