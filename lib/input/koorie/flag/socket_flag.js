import input from '../../../input.js'
import { options } from '../../../../index.js'
import { undefined_ } from 'oftypes'

export const socket_flagSymbol = Symbol( 'Object [ input.socket_flag ]' )
export const socket_flag = Object.defineProperty( input, socket_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.socket_flag ].
     *
     * - socket_flag type check.
     *
     * @param {string} option - the value from the shell.
     * @throws { Error }
     * @returns {Promise<{socket:socket}|Error|undefined>|{socket:socket}|Error|undefined}
     */
    value: async function socket_flag( option ){

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

                let { active, path, error } = await options( option.toString(), '--socket[-l]='.green().underline() )

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
} )

export default socket_flag[ socket_flagSymbol ]
