import flags from '../flags.js'
import { process_exit } from './flags__.js'
import { is_json, parse } from 'json-swiss-knife'
import { number_, undefined_ } from 'oftypes'

export const arguments_Symbol = Symbol( 'terminal flags option for the server' )
export const arguments_ = Object.defineProperty( flags, arguments_Symbol, {
    enumerable:true,
    configurable: false,
    writable: false,
    
    /**
     * Argument Parser.
     *
     * @param {string[]} args - Given arguments from terminal.
     * @returns {Promise<unknown>}
     */
    value: async function arguments_( args ){
        
        const regExpression = /\s*[^-\s](?![-])[.?]*[=]*[.?]*\S*/g
        const argumentsString = args.join( ' ' )
        
        let flagsArray = []
        const matches = Array.from( argumentsString.matchAll( regExpression ), matches => matches[ 0 ] )
        for ( const index in matches )
            flagsArray.push( matches[ index ].replaceAll( '-', '_' ).split( '=' ) )
    
        const flagsObject = Object.fromEntries( flagsArray )
        const flagsObjectKeys = Object.keys( flagsObject )
    
        for ( const flag in flagsObjectKeys ){
        
            switch ( flagsObjectKeys[ flag ] ) {
                
                case 'c':
                case 'cluster':
                    
                    if( await undefined_( flagsObject[ flagsObjectKeys[ flag ] ] ) === true )
                        flagsObject[ flagsObjectKeys[ flag ] ] = true
                    else {
                        
                        if ( await number_( flagsObject[ flagsObjectKeys[ flag ] ] ) === true )
                            flagsObject[ flagsObjectKeys[ flag ] ] = parseInt( flagsObject[ flagsObjectKeys[ flag ] ] )
                        else{
                            if( await is_json( flagsObject[ flagsObjectKeys[ flag ] ] ) === true )
                                flagsObject[ flagsObjectKeys[ flag ] ] = await parse( flagsObject[ flagsObjectKeys[ flag ] ] )
                        }
                    }
                    
                    continue
            
                case 'p':
                case 'port':
    
                    flagsObject[ flagsObjectKeys[ flag ] ] = parseInt( flagsObject[ flagsObjectKeys[ flag ] ] )
                    continue
    
                case 's':
                case 'static_files':
                    
                    continue
            
                case 'a':
                case 'address':
                
                    break
            
                default:
                    await process_exit( `${flagsObjectKeys[ flag ]} not available`, Error( 'rd-app-Flags-Error' ), 4 )
            }
        }
        
        return new Promise( resolve => {
            
            if( flagsObjectKeys.length === 0 )
                resolve( null )
            
            resolve( flagsObject )
        } )
        
    }
} )
