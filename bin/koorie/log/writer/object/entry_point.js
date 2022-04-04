import { basename, dirname } from 'path'
import { copyFileSync, statSync, writeFileSync } from 'node:fs'
import {
    koorie_log_writer_add,
    writer
} from '../exporter.js'

export let koorie_log_writer_filename = ''

const entry_pointSymbol = Symbol.for( 'Object [ binary.koorie.log.writer.entry_point ]' )
const entry_point = Object.defineProperty( writer, entry_pointSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ binary.koorie.log.writer.entry_point ]
     * it checks for log.json file size, if it exceeds the 250_000bytes writes a new log.json file
     * the old one is copied to a new file with Date.now() appended to the filename.
     *
     * @param {{filename:string, log: Object}} logger - the data receive through IPC
     */
    value: function koorie_log_writer_entry_point( logger ){

        let stats
        koorie_log_writer_filename = logger.filename

        try{
            stats = statSync( logger.filename )
            if( stats.size > 256_000 ){

                const filename = `${ dirname( logger.filename ) }/${ basename( logger.filename, 'json' ) }${ Date.now() }.json`
                copyFileSync( logger.filename, filename )
                process.nextTick( writeFileSync, logger.filename, '[]', { flag: 'w' } )

                setImmediate( () => { koorie_log_writer_add( logger.log ) } )
            }else
                setTimeout( () => { koorie_log_writer_add( logger.log ) }, 0 )

        }catch ( error ) {

            console.trace( error )
        }

    },
} )

export default entry_point[ entry_pointSymbol ]
