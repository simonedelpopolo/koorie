#!/usr/bin/env node
import { binary_koorie_log_writer } from '../../../../binary.js'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { override } from '@cli-blaze/decors'

await override()

process.argv.splice( 0, 2 )
process.title = 'koorie.log.writer'

if( process.argv > 0 ) {
    console.trace( process.argv )
    await exit(
        `${ process.title } doesn't accept any argument`,
        new Error( 'Object [ bin.koorie.log.writer ] - Error' ),
        error_code.INTERNAL,
    )
}

binary_koorie_log_writer()
