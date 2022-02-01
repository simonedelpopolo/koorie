import { fork } from '../../index.js'
import { initialize } from './initialize.js'
import koorie from '../koorie.js'
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
        process.env.static_files = 'public'
        process.env.react = 'false'

        const resolvers = {
            
            false: ( async () => {
                
                if(  await undefined_( flags.p || flags.port )  === false )
                    process.env.port = flags.p || flags.port
                
                if(  await undefined_( flags.a || flags.address ) === false )
                    process.env.address = flags.a || flags.address
    
                if(  await undefined_( flags.s || flags.static_files ) === false )
                    process.env.static_files = flags.s || flags.static_files
    
                if(  await undefined_( flags.r || flags.react ) === false )
                    process.env.react = flags.r || flags.react
    
                if( await undefined_( flags.c || flags.cluster ) === false ) {
        
                    if ( await undefined_( flags.false_flag ) === true ){
                        const options = flags.c || flags.cluster
            
                        await fork( options )
                    }
        
                }
    
                else {
                    if ( await undefined_( flags.false_flag ) === true )
                        await initialize()
                }
                
            } ),
            true: ( async () => {

                await initialize()
            } )
        }
        
        const execute = await null_( flags, resolvers )
        
        await execute()
        
    },
} )


