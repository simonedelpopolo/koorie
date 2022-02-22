import input from '../input.js'
import { true_false } from 'boolean-jokes'
import { boolean_, undefined_ } from 'oftypes'

export const hot_flagSymbol = Symbol( 'Object [ input.hot_flag ] route changes doesn\'t require server restart' )
export const hot_flag = Object.defineProperty( input, hot_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    value: {
    
        get : async ( options ) => {
            
            let flag
        
            const undefinedResolvers = {
            
                true:() => {
                
                    return true
                },
                false: async () => {
                
                    const hot_check = await internal_.type( options )
                
                    const done = hot_check.next()
                        .then( resolve => resolve.value )
                        .catch( error => error )
                
                    await hot_check.return()
                
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
            
            yield await boolean_( await true_false( check ) ) === false ?
        
                Promise.reject( new Error( `${ process.title } flags-error` ) ):
                Promise.resolve( check )
            
        }
    },
} )

const internal_ = hot_flag[ hot_flagSymbol ]
