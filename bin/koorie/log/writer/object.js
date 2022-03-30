import { default as binary } from '../../../binary.js'
import { koorie_log_writer_entry_point } from './exporter.js'

const objectSymbol = Symbol.for( 'Object [ binary.koorie.log.object ]' )
const object = Object.defineProperty( binary[ Symbol.for( 'Object [ binary ]' ) ], objectSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ binary.koorie.log.object ]
     * Object container & service bootstrapper.
     */
    value: function binary_koorie_log_writer(){

        process.on( 'message', logger  => koorie_log_writer_entry_point( logger ) )

        console.log( '----------------------------------------------------' )
        console.log( `${process.title} @PID ${process.pid}`.color( 63 ).bg_color( 253 ).strong() )
    }

} )

export default object[ objectSymbol ]
