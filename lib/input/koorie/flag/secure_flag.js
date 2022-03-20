import input from '../../../input.js'
import { options } from '../../../../index.js'
import { resolvers, undefined_ } from 'oftypes'

export const secure_flagSymbol = Symbol( 'Object [ input.secure_flag ]' )
export const secure_flag = Object.defineProperty( input, secure_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.secure_flag ].
     *
     * - secure_flag type check.
     *
     * @param {string} option - the value from the shell.
     * @throws { Error }
     * @returns {Promise<{secure:secure}|Error|undefined>|{secure:secure}|Error|undefined}
     */
    value: async function secure_flag( option ){

        let flag
        const secure = {
            active: null,
            key: null,
            cert: null,
            dhparam: null
        }

        /**
         * Resolver true.
         *
         * @returns {undefined}
         */
        const truthy = () => undefined

        /**
         * Resolver false.
         *
         * @returns {Promise<{secure: {active: boolean, cert: string, key: string, dhparam: string}, error: {[p: string]: *, any}}>|{secure: {active: boolean, cert: string, key: string, dhparam: string}, error: {[p: string]: *, any}}}
         */
        const falsy = async () => {
            let { active, key, cert, dhparam, error } = await options( option.toString(), '--secure[-l]='.green().underline() )

            secure.active = active
            secure.key = key
            secure.cert = cert
            secure.dhparam = dhparam || 'null'

            return { secure:secure, error:error }
        }

        flag = await  ( await undefined_( option, await resolvers( truthy, falsy ) ) )()

        return new Promise( ( resolve ) => {
            resolve( flag )
        } )
    }
} )

export default secure_flag[ secure_flagSymbol ]
