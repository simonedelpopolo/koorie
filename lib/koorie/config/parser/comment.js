/**
 * Object [ config.parser.comment ]
 * if found comment will not be parsed.
 *
 * @param {string} string - configuration string to be checked if is a comment or not.
 * @returns {boolean}
 */
export default function config_parser_comment( string ) {
    const reg_expression = /(?<=;).*$/g

    return Array.from( string.matchAll( reg_expression ), matches => matches[ 0 ] ).length > 0
}
