import koorie from '../koorie.js'

export const domainSymbol = Symbol( 'set the domain name of the server' )
export const domain = Object.defineProperty( koorie, domainSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: {
        domain: '',
        set: async ( name ) => {
            internal_.domain = name
        },
        get: async () => {
            return internal_.domain
        }
    }
} )

const internal_ = domain[ domainSymbol ]
