import input from '../input.js'
import {
    koorie_process,
    shell_process,
} from '../../input.js'
import { process_exit, shell_exit_codes } from '../../index.js'


const process_titleSymbol = Symbol( 'Object [ input.process_title ]' )
const process_title = Object.defineProperty( input, process_titleSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    value: async function* selector ( process_parsed_argv ){
        
        const YIELD = {
            resolve: null,
            reject: false
        }
        
        switch( process.title ){
            
            case 'koorie':
                
                YIELD.resolve = await koorie_process( process_parsed_argv )
                
                break
            case 'koorie-shell':
    
                YIELD.resolve = await shell_process( process_parsed_argv )
                
                break
            
            default:
                YIELD.reject = true
                break
        }
        
        yield new Promise( ( resolve ) => {
            
            if( YIELD.reject ) {
                let error = `\x1b[41m        process.title -> \`${ process.title }\` not recognize\x1b[0m\n`
                process_exit( error, new ReferenceError( 'internal-error' ), shell_exit_codes.internal ).catch( error => {throw error} )
            }
            
            resolve( YIELD.resolve )
            
        } )
        
    },
} )

export default process_title[ process_titleSymbol ]
