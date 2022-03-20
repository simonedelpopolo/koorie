import input from '../../../input.js'
import { number_, resolvers, undefined_ } from 'oftypes'

const author_flagSymbol = Symbol( 'Object [ input.init_author_flag ]' )
const author_flag = Object.defineProperty( input, author_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.init_author_flag ].
     *
     * - author_flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<string|Error|undefined>|string|Error|undefined}
     */
    value: async function init_author_flag( options ){

        /**
         * Type checking for author flag.
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
            const author_check = type( options )

            const done = await author_check.next()
                .then( resolve => resolve.value )
                .catch( error => new TypeError( error ) )

            return author_check.return( done ).then( check => check.value )
        }

        flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

        return new Promise( ( resolve, reject ) => {

            if( flag instanceof Error )
                reject( flag )

            resolve( flag )
        } )
    }
} )

export default author_flag[ author_flagSymbol ]
