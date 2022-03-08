import input from '../../input.js'
import { number_, undefined_ } from 'oftypes'

const library_flagSymbol = Symbol( 'Object [ input.library_flag ]' )
const library_flag = Object.defineProperty( input, library_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Object [ input.library_flag ].
     *
     * - library_flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<string|Error|undefined>|string|Error|undefined}
     */
    value: async function library_flag( options ){
    
        /**
         * Type checking for library flag.
         *
         * @param {any} check - value from flag.
         * @yields
         * @returns {AsyncGenerator<Promise<unknown>|Promise<never>, void, *>}
         */
        async function* type( check ){
        
            yield ( await number_(  check, {
                true:( () => {return Promise.reject( `${ process.title } flags-error` )} ),
                false: ( () => {return Promise.resolve( check )} )
            } ) )()
        
        }
    
        let flag
    
        const resolvers = {
        
            true:() => {
            
                return undefined
            },
            false: async () => {
            
                const library_check = await type( options )
            
                const done = library_check.next()
                    .then( resolve => resolve.value )
                    .catch( error => new TypeError( error ) )
            
                return library_check.return( done ).then( check => check.value )
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

export default library_flag[ library_flagSymbol ]
