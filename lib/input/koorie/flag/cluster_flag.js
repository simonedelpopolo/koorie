import input from '../../../input.js'
import { number_, resolvers, string_, undefined_ } from 'oftypes'

const cluster_flagSymbol = Symbol( 'Object [ input.cluster_flag ]' )
const cluster_flag = Object.defineProperty( input, cluster_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.cluster_flag ].
     *
     * - cluster_flag type check.
     *
     * @param {string} options - the value from the shell.
     * @throws { Error }
     * @returns {Promise<string|number|Error>|string|number|Error}
     */
    value: async function cluster_flag( options ){

        /**
         * Type checking for cluster flag.
         *
         * @param {any} check - value from flag.
         * @yields
         * @returns {AsyncGenerator<*>}
         */
        async function* type( check ){

            yield await number_( check ) === true

                // - oftype {number} goes through
                ? Promise.resolve( parseInt( check ) )
                : await string_( check ) === true && check === 'full'

                    // - oftype {string} or {string==='full' goes through
                    ? Promise.resolve( check )
                    // - any other value from full are rejected
                    : Promise.reject( `${ process.title } flags-error` )
        }

        let flag

        /**
         * Resolver true.
         *
         * @returns {boolean}
         */
        const truthy = () => true

        /**
         * Resolver false.
         *
         * @returns {Promise<*>}
         */
        const falsy = async () => {

            const cluster_check = await type( options )

            const done = cluster_check.next()
                .then( resolve => resolve.value )
                .catch( error => new TypeError( error ) )

            return cluster_check.return( done ).then( check => check.value )
        }

        flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

        return new Promise( ( resolve, reject ) => {

            if( flag instanceof Error )
                reject( flag )

            resolve( flag )
        } )
    }
} )

export default cluster_flag[ cluster_flagSymbol ]
