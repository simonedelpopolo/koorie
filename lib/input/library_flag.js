import input from '../input.js'
import { number_, undefined_ } from 'oftypes'

export const library_flagSymbol = Symbol( 'Object [ input.library_flag ] tells to koorie to expect a javascript library to be served' )
export const library_flag = Object.defineProperty( input, library_flagSymbol, {
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
                    
                    const library_check = await internal_.type( options )
                    
                    const done = library_check.next()
                        .then( resolve => resolve.value )
                        .catch( error => error )
                    
                    await library_check.return()
                    
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
            
            yield ( await number_(  check, {
                true:( () => Promise.reject( new Error( `${ process.title } flags-error` ) ) ),
                false: ( () => Promise.resolve( check ) )
            } ) )()
            
        }
    },
} )

const internal_ = library_flag[ library_flagSymbol ]
