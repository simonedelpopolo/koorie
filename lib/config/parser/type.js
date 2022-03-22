import parser from '../parser.js'

const typeSymbol = Symbol( 'Object [ config.parser.type ]' )
const type = Object.defineProperty( parser, typeSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ config.parser.type]
     * Object container for primitive types if matched.
     *
     * @type {Object}
     */
    value: {}
} )

export default type[ typeSymbol ]
