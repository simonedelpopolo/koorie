import input from '../../input.js'
import { number_, undefined_ } from 'oftypes'

const address_flagSymbol = Symbol( '--address[-a] type checking' )
const address_flag = Object.defineProperty( input, address_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Object [ input.address_flag ].
     *
     * - address_flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<string|Error|undefined>|string|Error|undefined}
     */
    value: async function address_flag( options ){
    
        /**
         * Type checking for address flag.
         *
         * @param {any} check - value from flag.
         * @yields
         * @returns {AsyncGenerator<Promise<unknown>|Promise<never>, void, *>}
         */
        async function* type( check ){
        
            yield await number_( check ) === true
                ? Promise.reject( `${ 'given option -> '.green() }'${check.toString().red()}' - ${ process.title } flags-error` )
                : Promise.resolve( check )
        }
    
        let flag
    
        const undefinedResolvers = {
        
            true:() => {
            
                return undefined
            },
            false: async () => {
            
                const address_check = type( options )
            
                const done = address_check.next()
                    .then( resolve => resolve.value )
                    .catch( error => new TypeError( error ) )
            
                return address_check.return( done ).then( check => check.value )
            
            }
        }
    
        flag = await  ( await undefined_( options, undefinedResolvers ) )()
    
        return new Promise( ( resolve, reject ) => {
        
            if( flag instanceof Error )
                reject( flag )
        
            resolve( flag )
        } )
    }
} )

export default address_flag[ address_flagSymbol ]
