import input from '../input.js'
import { number_, undefined_ } from 'oftypes'

export const address_flagSymbol = Symbol( '--address[-a] type checking' )
export const address_flag = Object.defineProperty( input, address_flagSymbol, {
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
    
                    const address_check = await internal_.type( options )
    
                    const done = address_check.next()
                        .then( resolve => resolve.value )
                        .catch( error => error )
    
                    await address_check.return()
                    
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

                Promise.reject( new TypeError( `${ process.title } flags-error [Object -> input.address_flag]` ) ):
                Promise.resolve( check )
                
                
        }
    }
} )

const internal_ = address_flag[ address_flagSymbol ]
