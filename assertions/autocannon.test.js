import autocannon from 'autocannon'
import { output__ } from 'trythistrythat/lib/exporter.js'
import { spawn } from 'child_process'
import { describe, failed } from 'trythistrythat'


export default async () => {
    
    await describe( 'autocannon test'.green(), 'assertion ->'.red(), 0 )
    await describe( '  listing statements'.green(), '⬇︎'.red(), '\n' )
    await describe( '    220 connections for 5 seconds of execution'.green(), '⚠︎'.red(), 'statement ->'.red(), 0 )
    
    await describe( '\n', '__________________________________________________________________________', '\n' )
    
    
    const koorie = spawn( 'node', [
        'koorie.js',
        '--port=34562',
        '-a=localhost',
        '-l=quiet:true',
        '-rt=false',
        '-s=assertions/public'
    ], {
        cwd: `${process.cwd()}`,
        stdio: [
            'ignore',
            process.stdout,
            process.stderr,
        ],
    } )
    
    koorie.on( 'error', error => {
        failed( true )
        console.trace( error )
        process.exit()
    } )
    
    koorie.on( 'spawn', () => {
        
        // Give some time for Koorie to be ready 100%
        setTimeout( () => {
            const instance = autocannon( {
                url: 'http://localhost:34562',
                method: 'GET',
                duration: 5,
                connections: 220,
            }, console.log )
            
            instance.on( 'done', () => {
                
                
                koorie.kill( 'SIGINT' )
                
                // Gives some time to autocannon print results then emit 'end'
                setTimeout( () => {
                    
                    output__.event.emit( 'end' )
                    
                }, 1000 )
                
            } )
    
            instance.on( 'error', () => {
                failed( true )
            } )
            
            // Just render results
            autocannon.track( instance, {
                renderProgressBar: true,
                renderLatencyTable: true
            } )
        }, 100 )
        
    } )
}
