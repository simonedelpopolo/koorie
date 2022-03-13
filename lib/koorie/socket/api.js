import { default as socket } from '../socket.js'

export const apiSymbol = Symbol( 'Object [ koorie.socket.api ]' )
export const  api = Object.defineProperty( socket, apiSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.socket.api ] container for socket APIs.
     */
    value: {}
} )

export default api[ apiSymbol ]
