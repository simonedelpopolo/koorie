#!/usr/bin/env node
import { binary_koorie_log_writer } from '../../../../binary.js'
import { process_exit, shell_exit_codes } from '../../../../index.js'

process.argv.splice( 0, 2 )
process.title = 'koorie.log.writer'

if( process.argv > 0 ) {
    await process_exit(
        `${ process.title } doesn't accept any argument`,
        new Error( 'Object [ bin.koorie.log.writer ] - Error' ),
        shell_exit_codes.internal,
    )
}

binary_koorie_log_writer()
