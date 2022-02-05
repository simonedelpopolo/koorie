import { initialize } from './initialize.js'
import koorie from '../koorie.js'
import { set_publicEvent } from './resource.js'
import { domain, fork, protocol, resource } from '../../whisk.js'
import { null_, undefined_ } from 'oftypes'

/**
 * @type {symbol}
 */
export const serverSymbol = Symbol( 'Lightweight server for react-dang app.' )
export const server = Object.defineProperty( koorie, serverSymbol, {
    configurable: false,
    enumerable: true,
    writable: false,
    
    /**
     * Lightweight server for react-dang app.
     *
     * @param {{p:string,port:string,a:string,address:string,c:string,cluster:string|object,s:string,static_files:string,false_flag:boolean|undefined, react:string|undefined,r:string|undefined}|null} flags - Parsed arguments.
     * @returns {Promise<void>}
     */
    value: async function server( flags = null ) {
        
        process.env.port = '3001'
        process.env.address = 'localhost'
        process.env.react = 'false'

        const resolvers = {
            
            false: ( async () => {
    
                console.log( flags )
                if(  await undefined_( flags.p || flags.port )  === false ){
                    if( flags.p || flags.port === 'null' )
                        process.env.port = 'null'
                    else
                        process.env.port = flags.a || flags.address
                }
                
                if(  await undefined_( flags.a || flags.address ) === false )
                    process.env.address = flags.a || flags.address
    
                if(  await undefined_( flags.d || flags.domain )  === false )
                    await domain.set( flags.d || flags.domain )
                else
                    await domain.set( process.env.address )
    
                if(  await undefined_( flags.l || flags.protocol )  === false )
                    await protocol.set( flags.l || flags.protocol )
                else
                    await protocol.set( 'http' )
    
                if(  await undefined_( flags.r || flags.react ) === false )
                    process.env.react = flags.r || flags.react
    
                set_publicEvent.on( 'done', async static_files => {
        
                    if( await undefined_( flags.c || flags.cluster ) === false ) {
            
                        if ( await undefined_( flags.false_flag ) === true ){
                            const options = flags.c || flags.cluster
                
                            await fork( options, static_files )
                        }
            
                    }
        
                    else {
                        if ( await undefined_( flags.false_flag ) === true )
                            await initialize()
                    }
        
                } )
    
                if(  await undefined_( flags.s || flags.static_files ) === true ) {
                    await resource.set_public( '' ).then( () => {
                        set_publicEvent.on( 'set', async answer => {
                            if ( answer === true ) {
                                process.env.static_files = await resource.get_public()
                                set_publicEvent.emit( 'done', { flag: false, path: await resource.get_path() } )
                            }
                        } )
            
                    } )
        
                }else if(  await undefined_( flags.s || flags.static_files ) === false ) {
                    set_publicEvent.on( 'set', async answer => {
            
                        if ( answer === true ) {
                            process.env.static_files = await resource.get_public()
                            set_publicEvent.emit( 'done', { flag: true, path: await resource.get_path() } )
                        }
                    } )
                    await resource.set_public( flags.s || flags.static_files )
                }
                
            } ),
            true: ( async () => {
                set_publicEvent.on( 'set', async answer => {
                    if ( answer === true ) {
                        process.env.static_files = await resource.get_public()
                        await domain.set( process.env.address )
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


