import { Blaze } from '@cli-blaze/decors'
import { options } from '@cli-blaze/input'
import { resolvers, undefined_ } from 'oftypes'

/**
 * Object [ input.secure_flag ].
 *
 * - secure_flag type check.
 *
 * @param {string} option - the value from the shell.
 * @throws { Error }
 * @returns {Promise<{secure:secure}|Error|undefined>|{secure:secure}|Error|undefined}
 */
export default async function secure_flag( option ){

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
        let { active, key, cert, dhparam, error } = await options( option.toString(), Blaze.underline( Blaze.green( '--secure[-l]=' ) ) )

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
