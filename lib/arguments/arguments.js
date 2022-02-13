import flags from '../flags.js'
import { address_flag_get, cluster_flag_get, domain_flag_get, init_command_get, logger_flag_get } from './exporter.js'
import { init, koorieErrors, process_exit, shell_exit_codes } from '../../index.js'
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
     * @returns {Promise | PromiseFulfilledResult<null|{p:boolean|number|undefined|string}>}
     */
    value: async function arguments_( args ){
        
        //@todo errors handling
        const regExpression = /\s*[^-\s](?![-])[.?]*[=]*[.?]*\S*/g
        const argumentsString = args.join( ' ' )
        
        let shell = false
        let shell_command
        const shell_options = {
            middleware: false
        }
        
        let flagsArray = []
        const matches = Array.from( argumentsString.matchAll( regExpression ), matches => matches[ 0 ] )
        
        for ( const index in matches )
            flagsArray.push( matches[ index ].replaceAll( '-', '_' ).split( '=' ) )
        
        const flagsObject = Object.fromEntries( flagsArray )
        const flagsObjectKeys = Object.keys( flagsObject )
        
        for ( const flag in flagsObjectKeys ){
            
            // @todo type checking for all the flags and commands or exit with error
            switch ( process.title ){
                
                // Koorie flags
                case 'koorie':
                    
                    switch ( flagsObjectKeys[ flag ] ) {
                        
                        case 'a':
                        case 'address':
                            
                            flagsObject[ flagsObjectKeys[ flag ] ] = await address_flag_get( flagsObject[ flagsObjectKeys[ flag ] ] )
                                .catch( async error => {
                                    await process_exit( '--address accept only string.', error, koorieErrors.flags )
                                } )
                            
                            continue
                        
                        case 'c':
                        case 'cluster':
                            
                            flagsObject[ flagsObjectKeys[ flag ] ] = await cluster_flag_get( flagsObject[ flagsObjectKeys[ flag ] ] )
                                .catch( async error => {
                                    await process_exit( '--cluster accept only numbers or string "full".', error, koorieErrors.flags )
                                } )
                            
                            continue
                        
                        case 'd':
                        case 'domain':
                            
                            flagsObject[ flagsObjectKeys[ flag ] ] = await domain_flag_get( flagsObject[ flagsObjectKeys[ flag ] ] )
                                .catch( async error => {
                                    await process_exit( '--domain accept only string.', error, koorieErrors.flags )
                                } )
                            
                            continue
                        
                        case 'l':
                        case 'logger': {
                            
                            const logger = await logger_flag_get( flagsObject[ flagsObjectKeys[ flag ] ] )
                                .catch( error => process_exit( error, Error( 'Koorie-Flags-Error' ), koorieErrors.flags ) )
                            flagsObject[ flagsObjectKeys[ flag ] ] = logger.logger
                            
                            continue
                        }
                        
                        case 'ml':
                        case 'middleware':
                            
                            continue
                        
                        case 'p':
                        case 'port':
                            
                            if( await undefined_( flagsObject[ flagsObjectKeys[ flag ] ] ) === false ) {
                                
                                if ( await number_( flagsObject[ flagsObjectKeys[ flag ] ] ) === false )
                                    await process_exit( '--port accept only numbers.', Error( 'Koorie-Flags-Error' ), koorieErrors.flags )
                                
                                flagsObject[ flagsObjectKeys[ flag ] ] = parseInt( flagsObject[ flagsObjectKeys[ flag ] ] )
                                
                            } else
                                flagsObject[ flagsObjectKeys[ flag ] ] = 3001
                            
                            continue
                        
                        case 's':
                        case 'static_files':
                            
                            continue
                        
                        case 'pr':
                        case 'protocol':
                            
                            continue
                        
                        case 'r':
                        case 'react': {
                            
                            const resolvers = {
                                true: ( () => { return 'true' } ),
                                false: ( () => { return flagsObject[ flagsObjectKeys[ flag ] ] } ),
                            }
                            flagsObject[ flagsObjectKeys [ flag ] ] = ( await undefined_( flagsObject[ flagsObjectKeys [ flag ] ], resolvers ) )()
                            
                            
                            console.log( flagsObject[ flagsObjectKeys [ flag ] ] )
                            
                            
                            continue
                            
                        }
                        case 'false_flag':
                            
                            break
                        
                        default: {
    
                            let error = `\x1b[41m        flag \`${ flagsObjectKeys[ flag ] }\` not recognize\x1b[0m\n`
                            error += `\x1b[41m        run -> ${ process.title } help[h]        \x1b[0m\n`
                            await process_exit( error, new TypeError( `${ process.title } flags-error` ), shell_exit_codes.flags )
    
                            await process_exit( `${ flagsObjectKeys[ flag ] } not available`, Error( 'Koorie-Flags-Error' ), koorieErrors.flags )
                        }
                    }
                    
                    break
                
                // Koorie-Shell commands and flags
                case 'koorie-shell':
                    
                    shell = true
                    switch ( flagsObjectKeys[ flag ] ) {
                        
                        case 'init':
                            
                            shell_command = 'init'
                            
                            await init_command_get( flagsObject[ flagsObjectKeys[ flag ] ] ).catch( error => process_exit( error, Error( 'Koorie-Shell-Commands-Error' ), 4 ) )
                            
                            delete flagsObject.init
                            flagsObjectKeys.splice( 0, 1 )
                            
                            for ( const flag in flagsObjectKeys ) {
                                
                                switch ( flagsObjectKeys[ flag ] ) {
                                    case 'ml':
                                    case 'middleware':
                                        
                                        shell_options.middleware =  flagsObject[ flagsObjectKeys[ flag ] ].toString()
                                        continue
                                    default:
                                        
                                        await process_exit( `${ flagsObjectKeys[ flag ] } not available`, Error( 'Koorie-Shell-Commands-Flags-Error' ), 4 )
                                }
                            }
                            
                            
                            break
                        default:
                            
                            await process_exit( `${ flagsObjectKeys[ flag ] } not available`, Error( 'Koorie-CLI-Flags-Error' ), 4 )
                        
                    }
                    break
                
                default:
                    
                    throw Error( 'unrecognized process.name' )
            }
        }
        
        if( shell ) {
            switch ( shell_command ) {
                
                case 'init':
                    await init( shell_options )
                    
                    break
                default:
                    throw new Error( ':O|' )
            }
            
        }
        
        return new Promise( resolve => {
            
            if( flagsObjectKeys.length === 0 )
                resolve( null )
            
            resolve( flagsObject )
        } )
        
    }
} )
