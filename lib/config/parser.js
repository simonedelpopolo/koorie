import config from '../config.js'

const parserSymbol = Symbol( 'Object [ config.parser ]' )
const parser = Object.defineProperty( config, parserSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ config.parser ]
     *
     * @type {Object}
     */
    value: {}
} )

export default parser[ parserSymbol ]
