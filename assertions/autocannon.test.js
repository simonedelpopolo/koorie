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
        '--no-listening-check',
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

        let instance
        // Give some time for Koorie to be ready 100%
        setTimeout( () => {
            instance = autocannon( {
                url: 'http://localhost:34562',
                method: 'GET',
                duration: 5,
                connections: 220,
            }, console.log )

            instance.on( 'done', () => {
                koorie.kill( 'SIGINT' )
                process.exit( 0 )
            } )

            // Just render results
            autocannon.track( instance, {
                renderProgressBar: true,
                renderLatencyTable: true
            } )
        }, 100 )

        koorie.on( 'exit', code => {
            if( code !== 0 ) {
                tttt.failed( true )
                koorie.kill( 'SIGINT' )
                process.exit( 1 )
            }
        } )
    } )

    setTimeout( () => {

        tttt.end_test( tttt.id() )

    }, 5200 )
}
