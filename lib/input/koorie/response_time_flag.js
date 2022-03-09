import input from '../../input.js'
import { true_false } from 'boolean-jokes'
import { boolean_, undefined_ } from 'oftypes'

const response_time_flagSymbol = Symbol( 'Object [ input.response_time_flag ]' )
const response_time_flag = Object.defineProperty( input, response_time_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.response_time_flag ].
     *
     * - response_time_flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<string|Error|undefined>|string|Error|undefined}
     */
    value: async function response_time_flag( options ){

        /**
         * Type checking for response_time flag.
         *
         * @param {any} check - value from flag.
         * @yields
         * @returns {AsyncGenerator<Promise<unknown>|Promise<never>, void, *>}
         */
        async function* type( check ){

            const boolean = await true_false( check ).catch( error => error )

            const resolvers = {
                true: ( () => {return Promise.resolve( check )} ),
                false: ( () => {return Promise.reject( `${ 'given option -> '.green() }'${check.toString().red()}' - ${ process.title } flags-error` )} )
            }

            yield ( await boolean_( boolean, resolvers ) )()

        }

        let flag

        const resolvers = {

            true:() => {

                return undefined
            },
            false: async () => {

                const response_time_check = await type( options )

                const done = response_time_check.next()
                    .then( resolve => resolve.value )
                    .catch( error => new TypeError( error ) )

                return response_time_check.return( done ).then( check => check.value )

            }
        }

        flag = await ( await undefined_( options, resolvers ) )()

        return new Promise( ( resolve, reject ) => {

            if( flag instanceof Error )
                reject( flag )

            resolve( flag )
        } )
    }
} )

export default response_time_flag[ response_time_flagSymbol ]
