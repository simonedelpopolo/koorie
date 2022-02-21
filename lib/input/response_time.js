import input from '../input.js'
import { boolean_, number_, undefined_ } from 'oftypes'
import { true_false } from 'boolean-jokes'

export const response_timeSymbol = Symbol( 'Object [ input.response_time ] type checking for --response-time[-rt] flag' )
export const response_time = Object.defineProperty( input, response_timeSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    value: {
    
        get : async ( options ) => {
        
            let flag
            
            const undefinedResolvers = {
            
                true:() => {
                
                    return undefined
                },
                false: async () => {
                
                    const response_time_check = await internal_.type( options )
                
                    const done = response_time_check.next()
                        .then( resolve => resolve.value )
                        .catch( error => error )
                
                    await response_time_check.return()
                
                    return done
                
                }
            }
        
            flag = await  ( await undefined_( options, undefinedResolvers ) )()
        
            return new Promise( ( resolve, reject ) => {
            
                if( flag instanceof Error )
                    reject( flag )
            
                resolve( flag )
            } )
        },
        type: async function* ( check ){
            
            const boolean = await true_false( check )
            yield await boolean_( boolean ) === false ?
        
                Promise.reject( new Error( `${ process.title } flags-error` ) ):
                Promise.resolve( check )
        
        
        },
    }
} )

const internal_ = response_time[ response_timeSymbol ]
