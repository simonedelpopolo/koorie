import input from '../input.js'
import { options } from '../../index.js'
import { true_false } from 'boolean-jokes'
import { boolean_, string_, undefined_ } from 'oftypes'

export const loggerFlagSymbol = Symbol( '--logger[-l] type checking' )
export const loggerFlag = Object.defineProperty( input, loggerFlagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    value: {
        
        get : async ( opts ) => {
            
            let flag
            const logger = {
                quiet: null,
                write: null
            }
            
            const undefinedResolvers = {
                
                true:() => {
                    
                    return undefined
                },
                false: async () => {
                    
                    let { quiet, write, error } = await options( opts.toString(), '--logger[-l]='.green().underline() )
                    
                    const loggerQuietGenerator = await internal_.quiet( quiet )
                    const loggerWriteGenerator = await internal_.write( write )
                    
                    quiet = await loggerQuietGenerator.next()
                        .then( async resolve => resolve.value )
                    
                    logger.quiet = await loggerQuietGenerator.next()
                        .then( async fn => {
                            
                            return fn.value( quiet ).next()
                                .then( resolved => resolved.value )
                                .catch( error => error )
                        } )
                        
                    loggerQuietGenerator.return()
                    
                    logger.write = await loggerWriteGenerator.next()
                        .then( resolved => resolved.value )
                        .catch( error => error )
                    
                    loggerWriteGenerator.return()
                    
                    return { logger:logger, error:error }
                }
            }
            
            flag = await  ( await undefined_( opts, undefinedResolvers ) )()
            
            
            return new Promise( ( resolve, reject ) => {
                
                if( flag.logger.quiet instanceof Error )
                    reject( flag.logger.quiet )
                
                if( flag.logger.write instanceof Error )
                    reject( flag.logger.write )
                
                if( flag.error instanceof Error )
                    reject( flag.error )
                
                if( flag )
                    resolve( flag )
            } )
        },
        // - todo simplify.
        quiet: async function* ( check ){
            
            yield await undefined_( check ) === false ?

                Promise.resolve( await true_false( check ) ) :
                Promise.resolve( false )
            
            yield async function* ( quite ){
                
                await boolean_( quite ) === false?
                    yield Promise.reject( new Error( '--logger=quiet:<boolean> accept only boolean.' ) ) :
                    yield Promise.resolve( quite )
            }
            
        },
        write: async function* ( check ){
        
            yield await undefined_( check ) === false
                ? await string_( check ) === false
                    ? Promise.reject( new Error( '--logger=write:<string|null> accept only string|null.' ) )
                    : Promise.resolve( check )
                : null
        
        }
    }
} )

const internal_ = loggerFlag[ loggerFlagSymbol ]
