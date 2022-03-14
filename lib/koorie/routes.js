import koorie from '../koorie.js'

const routesSymbol = Symbol( 'Object [ koorie.routes ]' )
const routes = Object.defineProperty( koorie, routesSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: {}
} )

export default routes[ routesSymbol ]
