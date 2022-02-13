import autocannon from 'autocannon'
import { EventEmitter } from 'events'
import flags from '../lib/flags.js'
import { koorie__ } from '../index.js'
import { spawn } from 'child_process'

// Slicing out node and assertion.js paths.
process.argv.splice( 0, 2 )


const consoleTimeMessage = '|               \x1b[33massertion finished\x1b[0m                           |'
console.time( consoleTimeMessage )

let not_last = true
const AssertionEvent = new EventEmitter()

console.log( ' --------------------------------------------------------------------------' )
console.log( '|               \x1b[33masserting started\x1b[0m', new Date(), '                |' )
console.log( ' --------------------------------------------------------------------------' )
AssertionEvent.on( 'end', () => {
    
    console.log()
    console.log( '---------------------------------------------------------------------------' )
    
    console.timeEnd( consoleTimeMessage )
    
    if( not_last ) {
        console.log( ' --------------------------------------------------------------------------' )
        console.log( '|               \x1b[33masserting started\x1b[0m', new Date(), '                |' )
        console.log( ' --------------------------------------------------------------------------' )
    }
    
    console.time( consoleTimeMessage )
    console.log( '---------------------------------------------------------------------------' )
    
    if( tests.status === 'failed' )
        process.exit( 1 )
} )

const tests = {
    results: null,
    failed: false,
    status: null,
}

const Assertions = {
    
    // Koorie Object
    koorie_object : async () => {
        
        console.log( '---------------------------------------------------------------------------' )
        console.log( koorie__ )
        AssertionEvent.emit( 'end' )
        console.log( '---------------------------------------------------------------------------' )
    
    },
    
    // Flags Object
    flags_object : async () => {
        
        console.log( '---------------------------------------------------------------------------' )
        console.log( flags )
        AssertionEvent.emit( 'end' )
        console.log( '---------------------------------------------------------------------------' )
        
    },
    
    autocannon: async() => {
        
        const koorie = spawn( 'node', [
            'koorie.js',
            '--port',
            '-a=localhost',
            '-s=assertions/public'
        ], {
            cwd: '../',
            stdio: [
                'ignore',
                process.stdout,
                process.stderr,
            ],
        } )
        
        koorie.on( 'spawn', () => {

            // Give some time for Koorie to be ready 100%
            setTimeout( () => {
                const instance = autocannon( {
                    url: 'http://localhost:3001',
                    method: 'GET',
                    duration: 5,
                    connections: 220,
                }, console.log )
    
                instance.on( 'done', () => {
                    koorie.kill( 'SIGINT' )
    
                    not_last = false
                    // Gives some time to autocannon print results then emit 'end'
                    setTimeout( () => AssertionEvent.emit( 'end' ), 100 )
                    
                } )
    
                // Just render results
                autocannon.track( instance, {
                    renderProgressBar: true,
                    renderLatencyTable: true
                } )
            }, 100 )
            
        } )
        
    },
    
    // The on development try out assertion
    assertionOnGoing : async () => {},
}

if(  process.argv.length > 0 )
    await Assertions[ process.argv ]()
    
else {
    
    for( const assertion in Assertions )
        await Assertions[ assertion ]()
}
