import { Blaze } from '@cli-blaze/decors'
import { options } from '@cli-blaze/input'
import { undefined_ } from 'oftypes'

/**
 * Object [ input.socket_flag ].
 *
 * - socket_flag type check.
 *
 * @param {string} option - the value from the shell.
 * @throws { Error }
 * @returns {Promise<{socket:socket}|Error|undefined>|{socket:socket}|Error|undefined}
 */
export default async function socket_flag( option ){

    let flag
    const socket = {
        active: null,
        path: null
    }

    const resolvers = {

        true:() => {

            return undefined
        },
        false: async () => {

            let { active, path, error } = await options( option.toString(), Blaze.underline( Blaze.green( '--socket[-l]=' ) ) )

            socket.active = active
            socket.path = path

            return { socket:socket, error:error }
        }
    }

    flag = await  ( await undefined_( option, resolvers ) )()

    return new Promise( ( resolve ) => {
        resolve( flag )
    } )
}
