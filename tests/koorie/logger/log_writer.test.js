import * as tttt from 'trythistrythat'
import { Blaze } from '@cli-blaze/decors'
import { fork } from 'node:child_process'
import { is_json } from 'json-swiss-knife'
import { request } from 'node:http'

/**
 * Module filename - /Volumes/code/koorie/tests/koorie/logger/log_writer.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

    tttt.describe( '# --experimental-log-writer' )
    await tttt.separator( 240, 75, '~' )
    await tttt.line()

    const working_directory = process.cwd()

    const koorie_log_writer = fork( `${working_directory}/tests/koorie/logger/bin/koorie_log_writer.bin.test.js`, {
        cwd: process.cwd()
    } )

    let Outgoing

    const make_request = (  ) => {

        Outgoing = request( 'http://localhost:36586/', Incoming => {

            Incoming.on( 'data', async data => {

                if( Incoming.statusCode !== 200 ){
                    tttt.failed( true )
                    tttt.describe( Blaze.red( ' test failed' ) )
                }else{
                    if( !( await is_json( data ) ) ){
                        tttt.failed( true )
                        tttt.describe( Blaze.red( ' test failed' ) )
                    }
                }
            } )

            Incoming.on( 'error', error => console.trace( error ) )
        } )
        Outgoing.on( 'error', () => {} )
        Outgoing.end()
    }

    koorie_log_writer.on( 'spawn', () => {
        const repeater = () => {
            let counter = 1
            const request_100 = setInterval( async function (){
                process.stdout.write( Blaze.yellow( counter.toString( 10 ) ) + ' requests done\r' )
                counter++
                make_request()
                if( counter === 101 ) {
                    Outgoing.destroy()
                    clearInterval( request_100 )
                    process.kill( koorie_log_writer.pid )
                    tttt.describe( Blaze.green( '\n test passed' ) )
                    tttt.end_test( id )
                }

            }, 25 )
        }
        setTimeout( repeater, 500 )


    } )

}
