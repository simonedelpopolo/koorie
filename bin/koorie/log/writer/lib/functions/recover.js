import { koorie_log_writer_filename } from '../entry_point.js'
import { parse } from 'json-swiss-knife'
import { basename, dirname } from 'path'
import { cpSync, readFileSync, writeFileSync } from 'node:fs'

/**
 * Object [ binary.koorie.log.writer.functions.recover ]
 * little helper in case parsed JSON in not well form.
 */
export async function koorie_log_writer_recover(){
    const filename = `${ dirname( koorie_log_writer_filename ) }/${ basename( koorie_log_writer_filename, 'json' ) }${ Date.now() }-read-error.json`
    cpSync( koorie_log_writer_filename, filename )
    try{
        process.nextTick( writeFileSync, koorie_log_writer_filename, '[]', { flag: 'w' } )

        try{
            const buffer = readFileSync( koorie_log_writer_filename )

            return parse( buffer ).catch( error => error )
        }catch ( error ) {
            return error
        }


    }catch ( error ) {
        return error
    }
}
