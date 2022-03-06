import * as readline from 'node:readline'
import config from '../config.js'
import { EventEmitter } from 'node:events'
import { access, createReadStream } from 'node:fs'

const parserEmitter = new EventEmitter()

const parserSymbol = Symbol( 'Object [ config.parser ]' )
const parser = Object.defineProperty( config, parserSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    value: {
    
        /**
         * Get the .koorierc configuration file or just proceed.
         */
        get(){
            
            const configuration = {}
            const configuration_file_path = `${process.cwd()}/.koorierc`
            
            access( configuration_file_path, err => {
                
                if ( err )
                    
                    parserEmitter.emit( 'proceed' )
                
                else{
                    const readInterface = readline.createInterface( {
                        input: createReadStream( configuration_file_path )
                    } )
    
                    /**
                     * @type {string[]}
                     */
                    const process_arguments = []
                    
                    readInterface.on( 'line', ( line ) => {
                        let result = null
                        if( !internal_.comments( line ) ){
            
                            if( line.length > 0 && line.charCodeAt( 0 ) !== 32 ){
                                result = internal_.options( line )
                
                                process_arguments.push( `--${result[ 1 ]}=${result[ 2 ]}` )
                                configuration[ result[ 1 ] ] = internal_.types.integer( result[ 2 ] )
                            }
                        }
                    } )
    
                    readInterface.on( 'close', () => {
                        parserEmitter.emit( 'read', process_arguments )
                    } )
                }
                
            } )
        },
    
        /**
         * Event listener for the parser.get function.
         *
         * @returns {Promise<string[]> | string[]}
         */
        set(){
            
            return new Promise( ( resolve ) => {
        
                parserEmitter.on( 'read', configuration_read => {
                    resolve( configuration_read )
                } )
                
                parserEmitter.on( 'proceed', () => resolve( [ 'proceed' ] ) )
            } )
        },
    
        /**
         * Comment parser.
         *
         * @param {string} string - the readline.line.
         * @returns {boolean}
         */
        comments( string ){
    
            const regExpression = /(?<=;).*$/g
    
            return Array.from( string.matchAll( regExpression ), matches => matches[ 0 ] ).length > 0
        },
    
        /**
         * Options parser.
         *
         * @param {string} string - from readline.line
         * @returns {RegExpMatchArray}
         */
        options( string ){
            const regExpression = /(.*)\s[=]\s(.*)/g
    
            return Array.from( string.matchAll( regExpression ), matches => matches )[ 0 ]
        },
    
        types: {
            /**
             * Integer type parser.
             *
             * @param {string} string - from readline.line
             * @returns {number|string}
             */
            integer( string ){
                if( Number( string ) === parseInt( string ) )
        
                    return parseInt( string )
                else
        
                    return string
            }
        }
    }
} )

const internal_ = parser[ parserSymbol ]

export default parser[ parserSymbol ]
