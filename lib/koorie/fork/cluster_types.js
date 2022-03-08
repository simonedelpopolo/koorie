import { access } from 'fs/promises'
import { constants } from 'fs'
import os from 'os'
import { boolean_, number_, string_ } from 'oftypes'
import { fork, forkSymbol } from '../fork.js'

const cluster_typesSymbol = Symbol( 'Object [ koorie.fork.cluster_types ]' )
const cluster_types = Object.defineProperty( fork[ forkSymbol ], cluster_typesSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Type check for cluster given flags.
     *
     * @param {number|string|boolean} options - given flag.
     * @yields
     * @returns {AsyncGenerator<boolean|(function(*): Promise<void>)|*|Promise<number>|Promise<unknown>|Promise<number>|Promise<never>, void, *>}
     */
    value: async function* run( options ) {
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
} )

export default cluster_types[ cluster_typesSymbol ]
