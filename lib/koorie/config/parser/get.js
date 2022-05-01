import * as readline from 'node:readline'
import { default as comment } from './comment.js'
import { default as configuration } from './configuration.js'
import { EventEmitter } from 'node:events'
import { default as integer } from './type/integer.js'
import { access, createReadStream } from 'node:fs'

export const config_parser_get_event = new EventEmitter()

/**
 * Object [ config.parser.get ]
 * it read the configuration file and emits two events.
 *
 * @param {string=} path - path to your configuration file. Default ./.koorierc in the root directory of the project.
 * @param { boolean=} process_cwd - default the absolute path starts from process.cwd(). set it to false and, it will use just the argument 'path'.
 */
export default function config_parser_get( path = '.koorierc', process_cwd = true ) {
    const options = {}
    const absolute_path = process_cwd === true ? process.cwd() : null

    const configuration_file_path = `${absolute_path}/${path}`

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
