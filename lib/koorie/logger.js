import { constants } from 'fs'
import { dirname } from 'path'
import koorie from '../koorie.js'
import { process_exit } from '../../index.js'
import { string_ } from 'oftypes'
import { access, writeFile } from 'fs/promises'

export const loggerSymbol = Symbol( 'function that handles the log of the server' )
export const logger = Object.defineProperty( koorie, loggerSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,
    
    /**
     * Handles the server log.
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
            const error = await access( dirname( log.write ), constants.F_OK || constants.W_OK ).catch( error => error )
            
            if( error instanceof Error )
                await process_exit( error.message, new Error( '[koorie.logger] write error' ), 2 )
            
            for( const message in log.info )
                
                await writeFile( log.write, `${JSON.stringify( log.info[ message ] )}\n`, { flag: 'a+' } ).catch( error => console.trace( error ) )
            
        }
    }
} )
