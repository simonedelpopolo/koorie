#!/usr/bin/env node  --experimental-json-modules --experimental-import-meta-resolve --trace-warnings --no-warnings
import { Blaze } from '@cli-blaze/decors'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import koorie_log_writer_entry_point from './lib/entry_point.js'

process.argv.splice( 0, 2 )
process.title = 'koorie.log.writer'

if( process.argv > 0 )
    await exit( `${ process.title } doesn't accept any argument`, new Error( 'bin.koorie.log.writer - error' ), error_code.INTERNAL, )

process.on( 'message', logger  => koorie_log_writer_entry_point( logger ) )

console.log( '----------------------------------------------------' )
console.log( Blaze.strong( Blaze.bg_color( 253, Blaze.color( 63, `${process.title} @PID ${process.pid}` ) ) ) )
