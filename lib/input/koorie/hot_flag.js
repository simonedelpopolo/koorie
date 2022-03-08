import input from '../../input.js'
import { true_false } from 'boolean-jokes'
import { boolean_, undefined_ } from 'oftypes'

const hot_flagSymbol = Symbol( 'Object [ input.hot_flag ]' )
const hot_flag = Object.defineProperty( input, hot_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Object [ input.hot_flag ].
     *
     * - hot_flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<string|Error|undefined>|string|Error|undefined}
     */
    value: async function hot_flag( options ){
    
        /**
         * Type checking for hot flag.
         *
         * @param {any} check - value from flag.
         * @yields
         * @returns {AsyncGenerator<Promise<unknown>|Promise<never>, void, *>}
         */
        async function* type( check ){
        
            yield await boolean_( await true_false( check ) ) === false
        
                ? Promise.reject( `${ process.title } flags-error` )
                : Promise.resolve( check )
        
        }
    
        let flag
    
        const resolvers = {
        
            true:() => {
            
                return true
            },
            false: async () => {
            
                const hot_check = await type( options )
            
                const done = hot_check.next()
                    .then( resolve => resolve.value )
                    .catch( error => new TypeError( error ) )
            
                await hot_check.return( done ).then( check => check.value )
            
                return done
            
            }
        }
    
        flag = await  ( await undefined_( options, resolvers ) )()
    
        return new Promise( ( resolve, reject ) => {
        
            if( flag instanceof Error )
                reject( flag )
        
            resolve( flag )
        } )
    }
} )

export default hot_flag[ hot_flagSymbol ]
