import { access } from 'fs/promises'
import { constants } from 'fs'
import input from '../input.js'
import os from 'os'
import { boolean_, number_, string_, undefined_ } from 'oftypes'

export const cluster_flagSymbol = Symbol( '--cluster[-c] type checking' )
export const cluster_flag = Object.defineProperty( input, cluster_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    value: {
    
        // Function to check types of the argument passed from the flag
        get : async ( options ) => {
    
            let flag
            
            const undefinedResolvers = {
                
                true:() => {
                    
                    return true
                },
                false: async () => {
    
                    const cluster_check = await internal_.type( options )
    
                    const done = cluster_check.next()
                        .then( resolve => resolve.value )
                        .catch( error => error )
    
                    await cluster_check.return()
    
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
    
        // Type checking for the flag
        type: async function* ( check ){
        
            yield await number_( check ) === true ?
        
                Promise.resolve( parseInt( check ) ) :
        
                await string_( check ) === true && check === 'full' ?
        
                    Promise.resolve( check ) :
                    Promise.reject( new Error( `${ process.title } flags-error` ) )
        },
        
        // Type checking and error handling in koorie.fork()
        run: async function* ( options ){
    
            yield os.cpus().length === 1 ?
                Promise.resolve( 1 ) :

                await boolean_( options ) === true ?
                    Promise.resolve( os.cpus().length / 2 ) :
                    await number_( options ) === true ?
                        Promise.resolve( options ) :
                        await string_( options ) && options === 'full' ?
                            Promise.resolve( os.cpus().length ) :
                            Promise.reject( new Error( `${ process.title } cluster <oftypes> not granted` ) )
            
            yield async ( clusterCPUs ) => {
                
                if( clusterCPUs > os.cpus().length )
                    await Promise.reject( Error( `${ process.title } cpus-exceed [Object -> input.cluster_flags]` ) )
            }
            
            yield async ( initializeFile ) => {
                await access( initializeFile, constants.F_OK | constants.X_OK )
                    .catch( async error => {
                        await Promise.reject( error )
                    } )
            }
            
            yield true
            
        }
    }
} )

const internal_ = cluster_flag[ cluster_flagSymbol ]
