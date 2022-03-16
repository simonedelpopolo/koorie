import { default as request } from '../request.js'

const routesSymbol = Symbol( 'Object [ request.routes ]' )
const routes = Object.defineProperty( request, routesSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Collection of routes registered as GET|POST|DELETE|PUT handlers
     */
    value: [],
} )

export default routes[ routesSymbol ]
