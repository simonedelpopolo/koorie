import koorie from '../koorie.js'

export const loggerSymbol = Symbol( 'function that handles the log of the server' )
export const logger = Object.defineProperty( koorie, loggerSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,
    
    /**
     * Handles the server log.
     *
     * @param {{quiet:boolean, write:{disk:boolean, filename:string}=,info:any[]}} options - Infos.
     */
    value: function logger( options ){
    
        const log = {
            quiet: options?.quiet,
            write: {
                disk: options?.write?.disk,
                filename: options?.write?.filename
            },
            info: options?.info
        }
        
        if( log.quiet === false ){
            
            for( const message in log.info )
                console.info( log.info[ message ] )
        }
    }
} )
