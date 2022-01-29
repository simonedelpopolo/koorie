import { cluster_ } from '../../index.js'
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
     * @param {{p:string,port:string,a:string,address:string,c:string,cluster:string|object,s:string,static_files:string}|null} flags - Parsed arguments.
     * @returns {Promise<void>}
     */
    value: async function server( flags = null ) {
    
        process.env.port = '3001'
        process.env.address = 'localhost'
        process.env.static_files = flags.s || flags.static_files
        
        const resolvers = {
            
            false: ( async () => {
                
                if(  await undefined_( flags.p || flags.port )  === false )
                    process.env.port = flags.p || flags.port
                else
                    process.env.port = '3001'
                
                if(  await undefined_( flags.a || flags.address ) === false )
                    process.env.address = flags.a || flags.address
                else
                    process.env.address = '0.0.0.0'
                
                if( await undefined_( flags.c || flags.cluster ) === false ) {
    
                    const options = flags.c || flags.cluster
                    await cluster_( options )
                }
                
                else
                    await initialize()
                
            } ),
            true: ( async () => {

                await initialize()
            } )
        }
        
        const execute = await null_( flags, resolvers )
        
        await execute()
        
    },
} )


