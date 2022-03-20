import input from '../../../input.js'
import { number_, resolvers, undefined_ } from 'oftypes'

const description_flagSymbol = Symbol( 'Object [ input.init_description_flag ]' )
const description_flag = Object.defineProperty( input, description_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.description_flag ].
     *
     * - description_flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<string|Error|undefined>|string|Error|undefined}
     */
    value: async function init_description_flag( options ){

        /**
         * Type checking for description flag.
         *
         * @param {any} check - value from flag.
         * @yields
         * @returns {AsyncGenerator<Promise<Error|string>|Promise<never>, void, *>}
         */
        async function* type( check ){

            const truthy = () => Promise.reject( `${ 'given option -> '.green() }'${check.toString().red()}' - ${ process.title } flags-error` )
            const falsy = () => Promise.resolve( check )
            yield await ( await number_( check, await resolvers( truthy, falsy ) ) )()
        }

        let flag

        const truthy = () => undefined
        const falsy = async () => {
            const description_check = type( options )

            const done = await description_check.next()
                .then( resolve => resolve.value )
                .catch( error => new TypeError( error ) )

            return description_check.return( done ).then( check => check.value )
        }

        flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

        return new Promise( ( resolve, reject ) => {

            if( flag instanceof Error )
                reject( flag )

            resolve( flag )
        } )
    }
} )

export default description_flag[ description_flagSymbol ]
