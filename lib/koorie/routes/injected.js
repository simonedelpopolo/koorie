import { default as routes } from '../routes.js'

const injectedSymbol = Symbol( 'Object [ koorie.routes.injected ]' )
const injected = Object.defineProperty( routes, injectedSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.routes.injected ]
     */
    value: {},
} )

export default injected[ injectedSymbol ]
