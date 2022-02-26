import input from '../input.js'
import { undefined_ } from 'oftypes'

export const init_commandSymbol = Symbol( 'Object [ input.init ] command type checking' )
export const init_command = Object.defineProperty( input, init_commandSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    value: {
        
        get : async ( options ) => {
            
            let command
            
            const undefinedResolvers = {
                
                true:() => {
                    
                    return undefined
                },
                false: async () => {
                    
                    const init_check = await internal_.type( options )
                    
                    const done = await init_check.next()
                    
                    await init_check.return()
                    
                    return done
                    
                }
            }
            
            command = await  ( await undefined_( options, undefinedResolvers ) )()
            
            return new Promise( ( resolve, reject ) => {
                
                if( command instanceof Error )
                    reject( command )
                
                resolve( command )
            } )
        },
        type: async function* ( check ){
            
            yield await Promise.reject( new Error( `init doesn't take any argument. Given -> ${ check }` ) )
            
        }
    }
} )

const internal_ = init_command[ init_commandSymbol ]
