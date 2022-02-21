import input from '../input.js'
import { process_title } from '../../index.js'
import { property_value } from 'json-swiss-knife'

export const entry_pointSymbol = Symbol( 'shared entry point for both shell process [koorie & koorie-shell]' )
export const entry_point = Object.defineProperty( input, entry_pointSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Shared entry point for the available executable koorie & koorie-shell.
     *
     * @param {string[]} args - The process.argv passed to the process.
     * @returns {Promise<void>}
     */
    value: async function entry_point( args ){
        
        const reg_expression = /\s*[^-\s](?![-])[.?]*[=]*[.?]*\S*/g
        const arguments_to_string = args.join( ' ' )
    
        let process_arguments = []
        const matches = Array.from( arguments_to_string.matchAll( reg_expression ), matches => matches[ 0 ] )
    
        for ( const index in matches )
            process_arguments.push( matches[ index ].replaceAll( '-', '_' ).split( '=' ) )
    
        const process_argumentsObject = Object.fromEntries( process_arguments )
        const process_arguments_ObjectKeys = Object.keys( process_argumentsObject )
        
        let options_found = []
        const options_reg_expression = /\(([^)]+)\)/g
        for ( const options in process_argumentsObject ) {
            if ( typeof process_argumentsObject[ options ] === 'string' ) {
                const x = Array.from( process_argumentsObject[ options ].matchAll( options_reg_expression ), matches => matches[ 1 ] )
                if( x.length > 0 )
                    options_found.push( { [ options ]: await property_value( x[ 0 ].split( ':' ), true ).catch( error => {return { error: new Error( error ) }} ) } )
            }
            
        }
        
        const process_title_switcher = await process_title( {
            object: process_argumentsObject,
            keys: process_arguments_ObjectKeys
        } )
        
        const done = await process_title_switcher.next()
        
        return  process_title_switcher.return( done.value )
    
    },
} )
