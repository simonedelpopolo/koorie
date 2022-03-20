import koorie from '../koorie.js'

const resourceSymbol = Symbol( 'Object [ koorie.resource ]' )
const resource = Object.defineProperty( koorie, resourceSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource ] extends Object [ koorie ].
     *
     * @private
     * @type { Object }
     */
    value: {}
} )
export default resource[ resourceSymbol ]
