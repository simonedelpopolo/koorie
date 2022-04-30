import event from './event.js'
import { koorie_log_writer_filename } from './entry_point.js'
import koorie_log_writer_merge from './merge.js'
import { koorie_log_writer_recover } from './functions/recover.js'
import { parse } from 'json-swiss-knife'
import { readFileSync } from 'node:fs'

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
 */
export default function koorie_log_writer_read(){
    koorie_log_writer_merge()
    event.on( 'added', async key => {

        try {
            let buffer = readFileSync( koorie_log_writer_filename )
            let data = await parse( buffer ).catch( error => console.error( error ) )

            if( ! ( Array.isArray( data ) ) )
                data = await koorie_log_writer_recover().catch( error => console.error( error ) )

            event.emit( 'read', [ data, key ] )
        }catch ( error ) {
            console.error( error )
        }

    } )
}
