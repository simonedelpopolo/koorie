/* eslint-disable capitalized-comments */
import { EventEmitter } from 'events'
import input from '../lib/input.js'
import { koorie__ } from '../index.js'

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
    
    // Object [koorie]
    koorie_object : async () => {
        
        console.log( '---------------------------------------------------------------------------' )
        console.log( koorie__ )
        AssertionEvent.emit( 'end' )
        console.log( '---------------------------------------------------------------------------' )
    
    },
    
    // - Object [input]
    input_object : async () => {
        
        console.log( '---------------------------------------------------------------------------' )
        console.log( input )
        AssertionEvent.emit( 'end' )
        console.log( '---------------------------------------------------------------------------' )
        
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
