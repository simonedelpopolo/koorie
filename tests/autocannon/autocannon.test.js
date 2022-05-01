import * as tttt from 'trythistrythat'
import autocannon from 'autocannon'
import { Blaze } from '@cli-blaze/decors'
import { spawn } from 'child_process'

/**
 * Exports in module autocannon.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

    tttt.describe( Blaze.green( 'autocannon test' ), Blaze.red( 'assertion ->' ), 0 )
    tttt.describe( Blaze.green( '  listing statements' ), Blaze.red( '⬇︎' ), '\n' )
    tttt.describe( Blaze.green( '    220 connections for 5 seconds of execution' ), Blaze.red( '⚠︎' ), Blaze.red( 'statement ->' ), 0 )

    tttt.separator()

    const koorie = spawn( 'node', [
        'koorie.js',
        '--port=34562',
        '--address=localhost',
        '--logger=options(quiet:true)',
        '--response-time=false',
        '--silenced',
        '--static-files=public'
    ], {
        cwd: `${process.cwd()}`,
        stdio: [
            'ignore',
            process.stdout,
            process.stderr,
        ],
    } )

    koorie.on( 'spawn', () => {

        const pid = koorie.pid

        let instance
        // Give some time for Koorie to be ready 100%
        setTimeout( () => {

            instance = autocannon( {
                url: 'http://localhost:34562',
                method: 'GET',
                duration: 5,
                connections: 220,
            } )

            instance.on( 'done', () => {
                try{
                    process.kill( pid )
                    tttt.failed( false )
                    tttt.end_test( id )
                }catch ( error ) {
                    console.trace( error.code )
                    tttt.failed( true )
                    tttt.end_test( id )
                }
            } )

            // Just render results
            autocannon.track( instance, {
                renderProgressBar: true,
                renderLatencyTable: false
            } )

            koorie.on( 'exit', ( code, signal ) => {
                if( signal === 'SIGTERM' ) {
                    process.exit( 0 )
                    tttt.failed( false )
                    tttt.end_test( id )
                }
            } )
        }, 500 )

    } )
}
