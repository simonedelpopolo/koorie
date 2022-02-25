import { address } from './functions/address.js'
import { hot } from './functions/hot.js'
import { initialize } from '../initialize.js'
import { library } from './functions/library.js'
import { logger } from './functions/logger.js'
import { port } from './functions/port.js'
import { protocol } from './functions/protocol.js'
import { response_time } from './functions/response_time.js'
import { set_publicEvent } from '../resource.js'
import { socket } from './functions/socket.js'
import { boolean_, number_, string_, undefined_ } from 'oftypes'
import { fork, resource } from '../../../index.js'
import { server, serverSymbol, workers_flags } from '../server.js'

const server_resolversSymbol = Symbol( 'Object [ koorie.server.resolvers ] oftypes resolvers for flags' )
const server_resolvers = Object.defineProperty( server[ serverSymbol ], server_resolversSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: {
    
        /**
         * Resolvers for oftypes undefined_ function.
         *
         * @param {{
         *      p:number,port:number,
         *      a:string,address:string,
         *      c:number,cluster:number,
         *      lb:string, library: string,
         *      l:{quiet:boolean, write:string}, logger:{quiet:boolean, write:string},
         *      hot:undefined,
         *      pr:string,protocol:string,
         *      r:string,response_time:string,
         *      sk:{active:boolean,path:string}, socket:{active:boolean, path:string},
         *      s:string,static_files:string,
         *      false_flag:boolean|undefined,} |
         *      null} flags - Parsed arguments.
         * @returns {Promise<{false: ((function(): Promise<void>)|*), true: ((function(): Promise<void>)|*)}>}
         */
        async resolvers( flags ){
            
            return {
                false : ( async() => {
        
                    // Setting address if the flag is not undefined
                    await address( flags.a || flags.address )
                    
                    // Setting library if the flag is not undefined
                    await library( flags.lb || flags.library )
                    
                    // Setting hot if the flag is not undefined
                    await hot( flags.hot )
        
                    // Setting port if the flag is not undefined
                    await port( flags.port || flags.p )
        
                    // Setting logger if the flag is not undefined
                    await logger( flags.logger || flags.l )
    
                    // Setting protocol if the flag is not undefined
                    await protocol( flags.pr || flags.protocol )
        
                    // Setting response_time if the flag is not undefined
                    await response_time( flags.r || flags.response_time )
                    
                    // Setting socket if the flag is not undefined
                    await socket( flags.sk || flags.socket )
        
                    // Once the public directory is set, proceed with koorie.fork() and koorie.initialize()
                    set_publicEvent.on( 'done', async static_files => {
                        console.trace( workers_flags )
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
                
                true:( async () => {
                    set_publicEvent.on( 'set', async answer => {
                        if ( answer === true ) {
                            process.env.STATIC_FILES = await resource.get_public()
                            await initialize()
                        }
        
                    } )
                    await resource.set_public( '' )
                } )
            }
        }
    }
} )

export const server_resolvers__ = server_resolvers[ server_resolversSymbol ].resolvers

