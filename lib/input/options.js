import input from '../input.js'
import { property_value } from 'json-swiss-knife'

const optionsSymbol = Symbol( 'Object [ input.options ]' )
const options = Object.defineProperty( input, optionsSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ input.options ] parses, if any, the options given to the flag.
     *
     * @param { string }flag_value - the flag value passed to cli.
     * @param { string }flag_name - flag name in case of error while parsing the options.
     * @returns { Promise<{ [ p:string ]:{ [ p:string ], any} }> }
     */
    value: async function options( flag_value, flag_name ){

        let options = flag_value

        if( typeof flag_value === 'string' ) {
            const options_reg_expression = /\(([^)]+)\)/g
            const matches = Array.from( flag_value.matchAll( options_reg_expression ), matches => matches[ 1 ] )

            if ( matches.length > 0 ) {

                const option_value_reg_expression = /(.*)[|](.*)/g
                const matches_option_value = Array.from( matches[ 0 ].matchAll( option_value_reg_expression ), option_value_matches => option_value_matches[ 0 ] )

                let parsed = matches[ 0 ]
                if( matches_option_value.length > 0 )
                    parsed =  matches_option_value[ 0 ].replaceAll( '|', ':' )

                options = await property_value( parsed.split( ':' ), true )
                    .catch( error => {
                        let message = ` [json-swiss-knife.property_value] ${ error.red() } \n`
                        message += `    @ ${process.title} [...] ${flag_name} -> ${matches.toString().red().strong().underline()} \n`
                        message += '                                    ^'.red()

                        return {
                            error: new Error( message )
                        }
                    } )
            }
        }

        return new Promise( resolve => {
            resolve( options )
        } )
    }
} )

export default options[ optionsSymbol ]

