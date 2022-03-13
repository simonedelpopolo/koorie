import { constants } from 'fs'
import { dirname } from 'path'
import koorie from '../koorie.js'
import { parse } from 'json-swiss-knife'
import { string_ } from 'oftypes'
import { access, readFile, writeFile } from 'fs/promises'
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
     * @param {{quiet:boolean, write:string, info:string[]}} options - Infos.
     */
    value: async function logger( options ){

        const log = {
            quiet: options.quiet,
            write: options.write,
            info: options.info
        }

        if( log.quiet === false ){

            for( const message in log.info )
                console.info( log.info[ message ] )
        }

        if( await string_( log.write ) === true ) {
            // - is the directory there?
            // - is the directory writable by the process?
            let error = await access( dirname( log.write ), constants.F_OK || constants.W_OK ).catch( error => error )

            if( error instanceof Error )
                await process_exit( error.message, new Error( '[koorie.logger] permissions || directory error' ), shell_exit_codes.internal )

            error = await access( log.write, constants.F_OK ).catch( error => error )
            if( error instanceof Error  ) {
                const first_call = []
                for( const message in log.info )
                    first_call.push( log.info[ message ] )
                await writeFile( log.write, JSON.stringify( first_call ) )
            }
            else{
                const read_log = await readFile( log.write ).catch( async error => {
                    await process_exit( '[koorie.logger] readFile error', error, shell_exit_codes.internal )
                } )

                const json_log = await parse( read_log )
                    .catch( async error => {
                        await process_exit( '[koorie.logger] json-swiss-knife.parse error', error, shell_exit_codes.internal )
                    } )
                for( const message in log.info )
                    json_log.push( log.info[ message ] )

                const message_buffer = `${ JSON.stringify( json_log ) }\n`.toBuffer()
                await writeFile( log.write, message_buffer, { flag: 'w' } )
                    .catch( async error => {
                        await process_exit( '[koorie.logger] writeFile error', error, shell_exit_codes.internal )
                    } )
            }

        }
    }
} )

export default logger[ loggerSymbol ]
