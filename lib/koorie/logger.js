import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import koorie from '../koorie.js'
import { koorie_log_writer } from './logger/functions/fork_koorie_log_writer.js'
import { true_false } from 'boolean-jokes'
import { writeFile } from 'fs/promises'

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
        }

        if( log.quiet === false )
            console.info( log.info[ 0 ] )

        if ( typeof log.write === 'string' ) {

            if ( log.info[ 0 ].incoming ) {
                if ( log.info[ 0 ].incoming.url_search_params ) {
                    const params = {}
                    log.info[ 0 ].incoming.url_search_params.forEach( function ( value, key ) {
                        params[ key ] = value
                    } )
                    log.info[ 0 ].incoming.url_search_params = params
                }
            }

            // - simple log file line by line
            if ( !process.env.EXPERIMENTAL_LOG_WRITER ) {

                await writeFile( log.write, `${ JSON.stringify( log.info[ 0 ] ) }\n`, { flag: 'a+' } )
                    .catch( async error => {
                        await exit( '[koorie.logger] writeFile error', error, error_code.INTERNAL )
                    } )
            } else {
                const koorie_log_write_data = {
                    filename: log.write,
                    log: log.info[ 0 ],
                }

                const forked = await true_false( process.env.FORKED )
                if ( ! forked )
                    koorie_log_writer.send( koorie_log_write_data )
                else {
                    /**
                     * - the worker will send the data to the primary koorie process to be processed.
                     * - while designing the log_writer I have tried to use socket connection for the workers
                     *   they were dying and making crash the whole server
                     * - I use wrk to make the test.
                     *
                     * @example
                     * //spin-up koorie like this
                     * it will write the full debugging log
                     * ❗⚠ **to try it gently pass the flag --silenced good for production. koorie is not advisable to be used in production at this stage.**
                     * **node --trace-uncaught --trace-warnings ./koorie.js --static-files=public --logger='options(quiet:true|write:koorie.log.json)' --port=8080 --experimental-log-writer --cluster=2**
                     *
                     * ❗⚠ **keep in mind that this test will write around 1000 files for approximate 400MB**
                     * ❗⚠ **keep in mind that this test will consume around 1.5GB RAM**
                     * ❗⚠ **keep in mind that this test is CPU expensive**
                     * ❗⚠ **test conducted on MacMini M1(8core 8gpu) 16GB on an USB SSDisk**
                     * ℹ **It can take around five minutes for koorie_log_writer to finish the process of writing files.**
                     *
                     * // in another terminal run the following command.
                     *
                     * **wrk -t10 -d25s -c190 http://localhost:8080/index.html**
                     */
                    process.send( [ koorie_log_write_data ] )
                }

            }
        }
    }
} )

export default logger[ loggerSymbol ]
