import input from '../../input.js'
import { resolvers, undefined_ } from 'oftypes'

const init_git_flagSymbol = Symbol( 'Object [ input.init_git_flag ]' )
const init_git_flag = Object.defineProperty( input, init_git_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.init_git_flag ].
     *
     * - --git flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<Error|undefined>|Error|undefined}
     */
    value: async function init_git_flag( options ){

        let flag

        /**
         * Resolver true.
         *
         * @returns {undefined}
         */
        const truthy = () => true

        /**
         * Resolver false.
         * --git doesn't accept any argument.
         *
         * @returns {TypeError}
         */
        const falsy = () => new TypeError( `${ process.title } flags-error` )

        flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

        return new Promise( ( resolve, reject ) => {

            if( flag instanceof Error )
                reject( flag )

            resolve( flag )
        } )
    }
} )

export default init_git_flag[ init_git_flagSymbol ]
