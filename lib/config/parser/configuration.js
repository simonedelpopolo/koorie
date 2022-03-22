import parser from '../parser.js'

const configurationSymbol = Symbol( 'Object [ config.parser.configuration ]' )
const configuration = Object.defineProperty( parser, configurationSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ config.parser.configuration]
     * the configuration parsed into array from reg_expression.
     *
     * @param {string} string - configuration string to matched.
     * @returns {RegExpMatchArray}
     */
    value: function config_parser_configuration( string ) {

        const reg_expression = /(.*)\s[=]\s(.*)/g

        return Array.from( string.matchAll( reg_expression ), matches => matches )[ 0 ]
    }
} )

export default configuration[ configurationSymbol ]
