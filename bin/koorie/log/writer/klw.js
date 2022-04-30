#!/usr/bin/env node
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import koorie_log_writer_entry_point from './lib/entry_point.js'
import { override } from '@cli-blaze/decors'

process.argv.splice( 0, 2 )
process.title = 'koorie.log.writer'

if( process.argv > 0 )
    await exit( `${ process.title } doesn't accept any argument`, new Error( 'bin.koorie.log.writer - error' ), error_code.INTERNAL, )

await override()

process.on( 'message', logger  => koorie_log_writer_entry_point( logger ) )

console.log( '----------------------------------------------------' )
console.log( `${process.title} @PID ${process.pid}`.color( 63 ).bg_color( 253 ).strong() )
