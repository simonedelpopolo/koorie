import type from '../type.js'

const integerSymbol = Symbol( 'Object [ config.parser.type.integer ]' )
const integer = Object.defineProperty( type, integerSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ config.parser.type.integer ]
     * Object container for primitive integers if matched.
     *
     * @param {string} string - the string to be returned as number if it is of that type.
     * @returns {string|number}
     */
    value: function config_parser_type_integer( string = '' ){
        if( Number( string ) === parseInt( string ) )

            return parseInt( string )
        else

            return string
    }
} )

export default integer[ integerSymbol ]
