import { koorie_log_writer_filename } from './entry_point.js'
import { writeFileSync } from 'node:fs'
import {
    koorie_log_writer_clear,
    koorie_log_writer_event,
    writer,
} from '../exporter.js'

const writeSymbol = Symbol.for( 'Object [ binary.koorie.log.writer.write ]' )
const write = Object.defineProperty( writer, writeSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ binary.koorie.log.writer.write ]
     * it listens for the 'merged' event
     * it writes the new data to the log.json file.
     *
     * @fires 'wrote'
     */
    value: function koorie_log_writer_write(){

        koorie_log_writer_clear()
        koorie_log_writer_event.on( 'merged', data => {

            const merged = data[ 0 ]
            const key = data[ 1 ]

            try{
                writeFileSync( koorie_log_writer_filename, JSON.stringify( merged ), { flag: 'w' } )
                koorie_log_writer_event.emit( 'wrote', key )

            }catch( error ){
                console.error( error )
            }
        } )
    },
} )

export default write[ writeSymbol ]
