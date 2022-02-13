import { access } from 'fs/promises'
import { constants } from 'fs'
import flags from '../flags.js'
import os from 'os'
import { boolean_, number_, string_, undefined_ } from 'oftypes'

export const clusterFlagSymbol = Symbol( '--cluster[-c] type checking' )
export const clusterFlag = Object.defineProperty( flags, clusterFlagSymbol, {
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
    
        // Type checking for the flag
        type: async function* ( check ){
        
            yield await number_( check ) === true ?
        
                Promise.resolve( parseInt( check ) ) :
        
                await string_( check ) === true && check === 'full' ?
        
                    Promise.resolve( check ) :
                    Promise.reject( new Error( 'Koorie-Flags-Error' ) )
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
                            Promise.reject( new Error( 'Koorie-Cluster-Run <oftypes> not granted' ) )
            
            yield async ( clusterCPUs ) => {
                
                if( clusterCPUs > os.cpus().length )
                    await Promise.reject( Error( 'Koorie-CPUs-Exceed' ) )
            }
            
            yield async ( initializeFile ) => {
                await access( initializeFile, constants.F_OK | constants.X_OK )
                    .catch( async error => {
                        await Promise.reject( error.message )
                    } )
            }
            
        }
    }
} )

const internal_ = clusterFlag[ clusterFlagSymbol ]
