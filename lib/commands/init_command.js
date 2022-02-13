import flags from '../flags.js'
import { undefined_ } from 'oftypes'

export const initCommandSymbol = Symbol( 'init command type checking' )
export const initCommand = Object.defineProperty( flags, initCommandSymbol, {
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
                    
                    return internal_.type( options ).next()
                        .catch( error => error )
                    
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

const internal_ = initCommand[ initCommandSymbol ]
