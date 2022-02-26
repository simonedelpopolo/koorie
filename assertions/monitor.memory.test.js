import { deepEqual } from 'assert'
import { output__ } from 'trythistrythat/lib/exporter.js'
import { describe, failed } from 'trythistrythat'
import { memory, memorySymbol } from '../lib/monitor/memory.js'

// - todo trythistrythat mock a long running process.
export default async () => {
    
    await describe( 'Object [ monitor.memory ] test' )
    
    const expected = {
        'process.title': '4t',
        '4t - memory':{
            rss: 4555,
            heapTotal: 6995968,
            heapUsed: 5167296,
            external: 578400,
            arrayBuffers: 19822
        }
    }
    
    const actual = await memory[ memorySymbol ]()
    
    try {
        deepEqual( actual, expected, )
        output__.event.emit( 'end' )
    }catch ( error ) {
        console.trace( error )
        output__.event.emit( 'end' )
        failed( true )
    }
    
}
