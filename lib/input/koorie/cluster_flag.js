import input from '../../input.js'
import { number_, string_, undefined_ } from 'oftypes'

const cluster_flagSymbol = Symbol( 'Object [ input.cluster_flag ]' )
const cluster_flag = Object.defineProperty( input, cluster_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Object [ input.cluster_flag ].
     *
     * - address_flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<string|Error|undefined>|string|Error|undefined}
     */
    value: async function cluster_flag( options ){
    
        /**
         * Type checking for cluster flag.
         *
         * @param {any} check - value from flag.
         * @yields
         * @returns {AsyncGenerator<Promise<unknown>|Promise<never>, void, *>}
         */
        async function* type( check ){
        
            yield await number_( check ) === true
        
                ? Promise.resolve( parseInt( check ) )
                : await string_( check ) === true && check === 'full'
        
                    ? Promise.resolve( check )
                    : Promise.reject( `${ process.title } flags-error` )
        }
    
        let flag
    
        const resolvers = {
        
            true:() => {
            
                return true
            },
            false: async () => {
            
                const cluster_check = await type( options )
            
                const done = cluster_check.next()
                    .then( resolve => resolve.value )
                    .catch( error => new TypeError( error ) )
            
                return cluster_check.return( done ).then( check => check.value )
            
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

export default cluster_flag[ cluster_flagSymbol ]
