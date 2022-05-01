/**
 * Object [ config.parser.type.integer ]
 * Object container for primitive integers if matched.
 *
 * @param {string} string - the string to be returned as number if it is of that type.
 * @returns {string|number}
 */
export default function config_parser_type_integer( string = '' ){
    if( Number( string ) === parseInt( string ) )

        return parseInt( string )
    else

        return string
}
