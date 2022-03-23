import { config_parser_get_event } from './get.js'
import parser from '../parser.js'

const setSymbol = Symbol( 'Object [ config.parser.set ]' )
const set = Object.defineProperty( parser, setSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ config.parser.set ]
     * Event Listener for Object [ config.parser.get ].
     *
     * @returns {Promise<Object|string[]>}
     */
    value: function config_parser_set(){

        return new Promise( ( resolve ) => {

            config_parser_get_event.on( 'read', configuration_read => {
                resolve( configuration_read )
            } )

            config_parser_get_event.on( 'proceed', () => resolve( [ 'proceed' ] ) )
        } )
    }
} )

export default set[ setSymbol ]
