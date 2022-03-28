#!/usr/bin/env node
import { basename } from 'path'
import { createServer } from 'node:net'
import { EventEmitter } from 'node:events'
import { parse } from 'json-swiss-knife'
import { randomUUID } from 'crypto'
import { readFileSync, renameSync, statSync, writeFileSync } from 'node:fs'

/**
 * A set of conversion utilities
 */
await import( '../../../lib/extends/String/conversion/toBuffer.js' )
await import( '../../../lib/extends/String/conversion/toNumber.js' )
/**
 * - stdout text decoration
 */
await import( '../../../lib/extends/String/decoration/strong.js' )
await import( '../../../lib/extends/String/decoration/underline.js' )
/**
 * - stdout text colors
 */
await import( '../../../lib/extends/String/color/fg/color.js' )
await import( '../../../lib/extends/String/color/fg/black.js' )
await import( '../../../lib/extends/String/color/fg/blue.js' )
await import( '../../../lib/extends/String/color/fg/cyan.js' )
await import( '../../../lib/extends/String/color/fg/green.js' )
await import( '../../../lib/extends/String/color/fg/magenta.js' )
await import( '../../../lib/extends/String/color/fg/red.js' )
await import( '../../../lib/extends/String/color/fg/white.js' )
await import( '../../../lib/extends/String/color/fg/yellow.js' )
/**
 * - stdout background colors
 */
await import( '../../../lib/extends/String/color/bg/color.js' )
await import( '../../../lib/extends/String/color/bg/black.js' )
await import( '../../../lib/extends/String/color/bg/blue.js' )
await import( '../../../lib/extends/String/color/bg/cyan.js' )
await import( '../../../lib/extends/String/color/bg/green.js' )
await import( '../../../lib/extends/String/color/bg/magenta.js' )
await import( '../../../lib/extends/String/color/bg/red.js' )
await import( '../../../lib/extends/String/color/bg/white.js' )
await import( '../../../lib/extends/String/color/bg/yellow.js' )

process.title = 'koorie.log.writer'
const koorie_log_write_event = new EventEmitter()

const koorie_log_write_queue = {}
let koorie_log_write_filename = ''

koorie_log_write_event.on( 'wrote', () => {} )

koorie_log_write_event.on( 'merged', merged_data => {

    try{
        writeFileSync( koorie_log_write_filename, JSON.stringify( merged_data ), { flag: 'w' } )
    }catch( error ){
        console.error( error )
    }

    koorie_log_write_event.emit( 'wrote' )
} )

koorie_log_write_event.on( 'read', previous_data => {

    try {
        previous_data[ 0 ].push( koorie_log_write_queue[ previous_data[ 1 ] ] )
    }catch ( error ) {
        console.error( error )
    }

    koorie_log_write_event.emit( 'merged', previous_data[ 0 ] )
} )

koorie_log_write_event.on( 'added', key => {

    try {
        const buffer = readFileSync( koorie_log_write_filename )

        parse( buffer )
            .catch( error => {

                console.trace( error, 'retrying' )
                parse( readFileSync( koorie_log_write_filename ) )
                    .catch( error => console.error( error ) )
                    .then( data => koorie_log_write_event.emit( 'read', [ data, key ] ) )
            } )
            .then( data => koorie_log_write_event.emit( 'read', [ data, key ] ) )

    }catch ( error ) {
        console.error( error )
    }

} )

/**
 * Add data to the queue.
 *
 * @param {Object} data - new request object
 */
function add( data ){

    const request_id = randomUUID()
    koorie_log_write_queue[ request_id ] = data
    koorie_log_write_event.emit( 'added', request_id )
}

/**
 * Function that begins the process of writing the new request to the JSON file.
 *
 * @param {object} logger - new request object
 */
function writing( logger ){
    setTimeout( () => {
        koorie_log_write_filename = logger.filename

        const stats = statSync( logger.filename )
        if( stats.size > 256_000 ){

            try{
                renameSync( logger.filename, `${basename( logger.filename, 'json' )}${Date.now()}.json` )
                try{
                    process.nextTick( () => {
                        writeFileSync( logger.filename, '[]' )
                    } )

                    setTimeout( () => { add( logger.log ) }, 2000 )

                }catch ( error ) {
                    console.log( error )
                }
            }catch( error ){
                console.error( error )
            }
        }else
            add( logger.log )
    }, 5000 )
}

process.on( 'message', logger  => {
    writing( logger )
} )

console.log( '----------------------------------------------------' )
console.log( `${process.title} @PID ${process.pid}`.color( 63 ).bg_color( 253 ).strong() )

const write_process = createServer( socket => {

    socket.on( 'data', async buffer => {
        writing( await parse( buffer ) )
    } )

} )

write_process.on( 'error', error => console.error( error ) )

write_process.listen( '/tmp/koorie.log.writer.sock', async () => {
    console.log( '⌖ koorie.log.writer socket active at -> /tmp/koorie.log.writer.sock ⌖ '.color( 63 ).bg_color( 253 ).strong() )
    console.log( '----------------------------------------------------' )
} )

