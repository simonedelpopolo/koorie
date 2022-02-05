/* eslint-disable sort-imports */
const consoleTimeMessage = '|               \x1b[33massertion finished\x1b[0m                           |'
console.time( consoleTimeMessage )
import autocannon from 'autocannon'
import { EventEmitter } from 'events'
import { koorie__, resource }  from '../whisk.js'
import { set_publicEvent } from '../lib/koorie/resource.js'

const AssertionEvent = new EventEmitter()
console.log( ' --------------------------------------------------------------------------' )
console.log( '|               \x1b[33massertion started\x1b[0m', new Date(), '                |' )
console.log( ' --------------------------------------------------------------------------' )
AssertionEvent.on( 'end', () => {
    
    console.log( '___________________________________________________________________________' )
    console.log()
    console.log( ' --------------------------------------------------------------------------' )
    console.timeEnd( consoleTimeMessage )
    console.log( ' --------------------------------------------------------------------------' )
    
    console.log()
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
    
    // The testing unit for function is_json
    assertion0: async () => {
        
        console.log( '__________________________________________________________________________' )
        
        console.log( '\x1b[32menumerate koorie properties', '\x1b[31massertion ->', 0, '\x1b[0m' )
        console.log( '  \x1b[32mlisting statements', '\x1b[0m' )
        console.log( '    \x1b[32mproperties', '\x1b[31mstatement ->', 0, '\x1b[0m' )
        
        Assertions.assertion0.statement = {
            
            '0': async () => {
                console.log( '    \x1b[31m executing statement -> ', 0, '\x1b[0m\n' )
                
                const enumerateKoorieProperties = koorie__
                
                tests.results = enumerateKoorieProperties
                tests.failed = false
                
                tests.status = tests.failed === true ? 'failed' : 'concluded'
                Assertions.assertion0.statement[ '0' ].message = `test ${tests.status} -> enumerate koorie properties`
                
                return tests.results
            }
            
        }
        
        console.log( '---------------------------------------------------------------------------' )
        const response0 = await Assertions.assertion0.statement[ '0' ]()
        console.log( '\x1b[32m\nreturn ⬇︎', '\x1b[0m\n' )
        console.log( 'returned response -> ', response0 )
        console.log( Assertions.assertion0.statement[ '0' ].message )
        
    },
    
    // The on development try out assertion
    assertionOnGoing : async () => {
        await resource.set_public().then( () => {
            set_publicEvent.on( 'given answer', async answer => {
                if( answer === true )
                    console.log( await resource.get_public() )
            } )
            
        } )
        
    },
    
    autocannon0: async() => {
        
        const instance = autocannon( {
            url: 'http://localhost:3001/',
            method: 'GET',
            duration: 15,
            connections: 220,
        }, console.log )

        // This is used to kill the instance on CTRL-C
        process.once( 'SIGINT', () => {
            instance.stop()
        } )

        // Just render results
        autocannon.track( instance, {
            renderProgressBar: true,
            renderLatencyTable: true
        } )
    }
}

process.argv.splice( 0, 2 )

if(  process.argv.length > 0 ){
    
    await Assertions[ process.argv ]()
    AssertionEvent.emit( 'end' )
    
}else {
    
    for( const assertion in Assertions )
        await Assertions[ assertion ]()
    AssertionEvent.emit( 'end' )
    
}
