import flags from '../flags.js'
import { number_, undefined_ } from 'oftypes'

export const domainFlagSymbol = Symbol( '--domain[-d] type checking' )
export const domainFlag = Object.defineProperty( flags, domainFlagSymbol, {
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
                    
                    return internal_.type( options ).next()
                        .then( resolve => resolve.value )
                        .catch( error => error )
                    
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
            
                Promise.reject( new Error( 'Koorie-Flags-Error' ) ):
                Promise.resolve( check )
            
            
        }
    }
} )

const internal_ = domainFlag[ domainFlagSymbol ]
