/**
 * Object [ config.parser.configuration]
 * the configuration parsed into array from reg_expression.
 *
 * @param {string} string - configuration string to matched.
 * @returns {RegExpMatchArray}
 */
export default function config_parser_configuration( string ) {

    const reg_expression = /(.*)\s[=]\s(.*)/g

    return Array.from( string.matchAll( reg_expression ), matches => matches )[ 0 ]
}
