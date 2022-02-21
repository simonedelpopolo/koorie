import { initialize } from './initialize.js'
import koorie from '../koorie.js'
import { set_publicEvent } from './resource.js'
import { boolean_, null_, number_, string_, undefined_ } from 'oftypes'
import { domain, fork, protocol, resource } from '../../index.js'

/**
 * @type {symbol}
 */
export const serverSymbol = Symbol( 'Lightweight server' )
export const server = Object.defineProperty( koorie, serverSymbol, {
    configurable: false,
    enumerable: true,
    writable: false,
    
    /**
     * Lightweight server for react-dang app.
     *
     * @param {{
     *      p:number,port:number,
     *      a:string,address:string,
     *      c:number,cluster:number,
     *      l:boolean, logger:boolean,
     *      d:string,domain:string,
     *      pr:string,protocol:string,
     *      s:string,static_files:string,
     *      false_flag:boolean|undefined,
     *      react:string|undefined,r:string|undefined,
     *      response_time:string,rt:string} |
     *      null} flags - Parsed arguments.
     * @returns {Promise<void>}
     */
    value: async function server( flags = null ) {
        
        process.env.PORT = '3001'
        process.env.ADDRESS = 'localhost'
        process.env.REACT = 'false'
        process.env.LOGGER_QUIET = 'false'
        process.env.LOGGER_FILENAME = 'null'
        process.env.RESPONSE_TIME = 'true'
        
        const resolvers = {
            
            false: ( async () => {
                
                // Setting address if the flag is not undefined
                if(  await undefined_( flags.a || flags.address ) === false )
                    process.env.ADDRESS = flags.a || flags.address
                
                // Setting domain if the flag is not undefined
                if(  await undefined_( flags.d || flags.domain )  === false )
                    await domain.set( flags.d || flags.domain )
                else
                    await domain.set( process.env.ADDRESS )
                
                // Setting port if the flag is not undefined
                if(  await undefined_( flags.port || flags.p )  === false ) {
                    
                    if(  ( flags.port || flags.p ) !== 0 )
                        process.env.PORT = ( flags.port || flags.p ).toString()
                    
                }
    
                // Setting logger if the flag is not undefined
                if(  await undefined_( flags.logger || flags.l ) === false ) {
                    
                    const { quiet, write } = flags.logger || flags.l
                    
                    process.env.LOGGER_QUIET = quiet.toString()
                    process.env.LOGGER_FILENAME = write
                    
                }
    
                // Setting response_time if the flag is not undefined
                if(  await undefined_( flags.rt || flags.response_time ) === false )
                    process.env.RESPONSE_TIME = flags.rt || flags.response_time
    
                // Setting protocol if the flag is not undefined
                if(  await undefined_( flags.pr || flags.protocol )  === false )
                    await protocol.set( flags.pr || flags.protocol )
                else
                    await protocol.set( 'http' )
    
                // Setting react if the flag is not undefined
                if(  await undefined_( flags.r || flags.react ) === false )
                    process.env.REACT = flags.r || flags.react
    
                // Once the public directory is set, proceed with koorie.fork() and koorie.initialize()
                set_publicEvent.on( 'done', async static_files => {
        
                    
                    // Setting cluster if the flag is not undefined
                    if( await undefined_( flags.cluster || flags.c ) === false ) {
                        
                        // If the false flags is undefined run koorie.fork()
                        if ( await undefined_( flags.false_flag ) === true ){
                            
                            if( await number_( flags.c || flags.cluster ) === true ){
    
                                if(  ( flags.c || flags.cluster ) !== 0 )
                                    
                                    await fork( flags.c || flags.cluster, static_files )
                                    
                                else
                                    
                                    await fork( 0, static_files )
                                
                            }else if ( await boolean_( flags.c || flags.cluster ) === true )
                                
                                await fork( true, static_files )
                                
                            else if( await string_( flags.c || flags.cluster ) === true ) {
                                
                                if( ( flags.c || flags.cluster ).toString() === 'full' )
                                    
                                    await fork( 'full', static_files )
                            }
                            
                        }
                        
                    }
        
                    // If cluster flag is undefined and false flag is undefined run koorie.initialize()
                    else {
                        if ( await undefined_( flags.false_flag ) === true )
                            await initialize()
                    }
        
                } )
    
                // If static_files is undefined, koorie.resource.set_public(to an empty string)
                if(  await undefined_( flags.s || flags.static_files ) === true ) {
                    await resource.set_public( '' ).then( () => {
                        
                        // Because koorie.resource.set_public is set to an empty string is awaiting the answer
                        set_publicEvent.on( 'set', async answer => {
                            if ( answer === true ) {
                                process.env.STATIC_FILES = await resource.get_public()
                                set_publicEvent.emit( 'done', { flag: false, path: await resource.get_path() } )
                            }
                        } )
            
                    } )
        
                }else if(  await undefined_( flags.s || flags.static_files ) === false ) {
                    set_publicEvent.on( 'set', async answer => {
            
                        if ( answer === true ) {
                            process.env.STATIC_FILES = await resource.get_public()
                            set_publicEvent.emit( 'done', { flag: true, path: await resource.get_path() } )
                        }
                    } )
                    await resource.set_public( flags.s || flags.static_files )
                }
                
            } ),
            true: ( async () => {
                set_publicEvent.on( 'set', async answer => {
                    if ( answer === true ) {
                        process.env.STATIC_FILES = await resource.get_public()
                        await domain.set( process.env.ADDRESS )
                        await protocol.set( 'http' )
                        await initialize()
                    }
        
                } )
                await resource.set_public( '' )
            } )
        }
        
        const execute = await null_( flags, resolvers )
        
        await execute()
    },
} )


