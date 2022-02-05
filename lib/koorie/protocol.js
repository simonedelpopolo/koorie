import koorie from '../koorie.js'

export const protocolSymbol = Symbol( 'set the protocol of the server http/https' )
export const protocol = Object.defineProperty( koorie, protocolSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: {
        protocol: '',
        set: async ( value ) => {
            internal_.protocol = value + '://'
        },
        get: async () => {
            return internal_.protocol
        }
    }
} )

const internal_ = protocol[ protocolSymbol ]
