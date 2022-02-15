import input from '../input.js'
import { number_, undefined_ } from 'oftypes'

export const domain_flagSymbol = Symbol( '--domain[-d] type checking' )
export const domain_flag = Object.defineProperty( input, domain_flagSymbol, {
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
    
                    const domain_check = await internal_.type( options )
    
                    const done = domain_check.next()
                        .then( resolve => resolve.value )
                        .catch( error => error )
    
                    await domain_check.return()
    
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
            
            yield await number_( check ) === true ?
            
                Promise.reject( new Error( `${ process.title } flags-error` ) ):
                Promise.resolve( check )
            
            
        }
    }
} )

const internal_ = domain_flag[ domain_flagSymbol ]
