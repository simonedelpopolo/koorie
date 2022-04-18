import * as tttt from 'trythistrythat'
import { fork } from 'node:child_process'
import { parse } from 'json-swiss-knife'
import { readFile } from 'node:fs/promises'
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

    const make_request = () => {
        setTimeout( () => {
            const Outgoing = request( 'http://localhost:36586/', Incoming => {

                Incoming.on( 'data', async data => {

                    const log_file = working_directory + '/logs/log.json'

                    const relax = async () => {
                        if( Incoming.statusCode !== 200 ){
                            tttt.failed( true )
                            tttt.describe( ' test failed'.red() )
                        }else{
                            tttt.describe( ' test passed'.green() )
                            await tttt.line( 2 )
                        }

                        tttt.describe( 'response from server', await parse( data ) )

                        await readFile( log_file ).then( async buffer => {
                            tttt.describe( 'log file parsed', await parse( buffer ) )
                        } )

                        tttt.end_test( id )
                    }
                    setTimeout( relax, 500 )
                } )
            } )
            Outgoing.end()
        }, 500 )
    }

    koorie_log_writer.on( 'spawn', make_request )
}
