import * as tttt from 'trythistrythat'
import autocannon from 'autocannon'
import { spawn } from 'child_process'

export default async () => {

    tttt.describe( 'autocannon test'.green(), 'assertion ->'.red(), 0 )
    tttt.describe( '  listing statements'.green(), '⬇︎'.red(), '\n' )
    tttt.describe( '    220 connections for 5 seconds of execution'.green(), '⚠︎'.red(), 'statement ->'.red(), 0 )

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
                    tttt.end_test( tttt.id() )
                }catch ( error ) {
                    console.trace( error.code )
                    tttt.failed( true )
                    tttt.end_test( tttt.id() )
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
                    tttt.end_test( tttt.id() )
                }
            } )
        }, 500 )

    } )
}