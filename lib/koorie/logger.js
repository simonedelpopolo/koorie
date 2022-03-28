import { constants } from 'fs'
import { createConnection } from 'node:net'
import { dirname } from 'path'
import koorie from '../koorie.js'
import { koorie_log_write } from './server/functions/logger.js'
import { string_ } from 'oftypes'
import { access, writeFile } from 'fs/promises'
import { process_exit, shell_exit_codes } from '../../index.js'

const loggerSymbol = Symbol( 'Object [ koorie.logger ]' )
const logger = Object.defineProperty( koorie, loggerSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.logger ].
     *
     * **prints, writeFile the server's log**.
     *
     * print to stdout ca be silenced by setting the quiet option to false.
     *
     * when options.write is set to file path
     * the written file on disk, at the specified path,
     * is a json collection of all the requests done.
     * easy to send to an external database.
     *
     * @param {{quiet:boolean, write:string, info:any[], depth:null|number=}} options - Infos.
     */
    value: async function logger( options ){

        const log = {
            quiet: options.quiet,
            write: options.write,
            info: options.info,
            depth: options.depth || null
        }

        if( log.quiet === false ){

            for( const message in log.info )
                console.dir( log.info[ message ], { depth: log.depth } )
        }

        if( await string_( log.write ) === true ) {
            // - is the directory there?
            // - is the directory writable by the process?
            let error = await access( dirname( log.write ), constants.F_OK || constants.W_OK ).catch( error => error )

            if( error instanceof Error )
                await process_exit( error.message, new Error( '[koorie.logger] permissions || directory error' ), shell_exit_codes.internal )

            error = await access( log.write, constants.F_OK ).catch( error => error )
            if( error instanceof Error  ) {

                let logging
                if( process.env.EXPERIMENTAL_LOG_WRITER )
                    logging = process.env.EXPERIMENTAL_LOG_WRITER === 'active' ? `${JSON.stringify( [ log.info[ 0 ] ] )}` : `${JSON.stringify( log.info[ 0 ] )}\n`
                else
                    logging = `${JSON.stringify( log.info[ 0 ] )}\n`

                await writeFile( log.write, logging ).catch( async error => {
                    await process_exit( '[koorie.logger] writeFile error', error, shell_exit_codes.internal )
                } )
            }
            else{
                if( log.info[ 0 ].incoming ) {
                    if( log.info[ 0 ].incoming.url_search_params ) {
                        const params = {}
                        log.info[ 0 ].incoming.url_search_params.forEach( function( value, key ) {
                            params[ key ] = value
                        } )
                        log.info[ 0 ].incoming.url_search_params = params
                    }
                }

                const koorie_log_write_data = {
                    filename: log.write,
                    log: log.info[ 0 ]
                }

                if( !process.env.EXPERIMENTAL_LOG_WRITER ){
                    await writeFile( log.write, `${ JSON.stringify( log.info[ 0 ] ) }\n`, { flag: 'a+' } )
                        .catch( async error => {
                            await process_exit( '[koorie.logger] writeFile error', error, shell_exit_codes.internal )
                        } )
                }else {
                    if( process.env.FORKED === 'false' ) {
                        setTimeout( () => {
                            koorie_log_write.send( koorie_log_write_data )
                        }, 200 )

                    }
                    else if ( process.env.FORKED === 'true' ) {
                        setTimeout( () => {
                            const client = createConnection( { path:'/tmp/koorie.log.writer.sock' }, () => {
                                client.write( JSON.stringify( koorie_log_write_data ) )
                                client.end()
                            } )
                        }, 500 )
                    }
                }
            }

        }
    }
} )

export default logger[ loggerSymbol ]
