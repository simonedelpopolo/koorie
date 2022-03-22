import * as readline from 'node:readline'
import { default as comment } from './comment.js'
import { default as configuration } from './configuration.js'
import { EventEmitter } from 'node:events'
import { default as integer } from './type/integer.js'
import parser from '../parser.js'
import { access, createReadStream } from 'node:fs'

export const config_parser_get_event = new EventEmitter()

const getSymbol = Symbol( 'Object [ config.parser.get ]' )
const get = Object.defineProperty( parser, getSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ config.parser.get]
     * it read the configuration file and emits two events.
     */
    value: function config_parser_get(  ) {
        const options = {}
        const configuration_file_path = `${process.cwd()}/.koorierc`

        access( configuration_file_path, err => {

            if ( err )

                config_parser_get_event.emit( 'proceed' )

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
                    if( !comment( line ) ){

                        if( line.length > 0 && line.charCodeAt( 0 ) !== 32 ){
                            result = configuration( line )

                            process_arguments.push( `--${result[ 1 ]}${result[ 2 ] === 'undefined' ? '' : '=' + result[ 2 ]}` )
                            options[ result[ 1 ] ] = integer( result[ 2 ] )
                        }
                    }
                } )

                readInterface.on( 'close', () => {
                    config_parser_get_event.emit( 'read', process_arguments )
                } )
            }

        } )
    }
} )

export default get[ getSymbol ]
