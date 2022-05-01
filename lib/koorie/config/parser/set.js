import { config_parser_get_event } from './get.js'

/**
 * Object [ config.parser.set ]
 * Event Listener for Object [ config.parser.get ].
 *
 * @returns {Promise<Object|string[]>}
 */
export default function config_parser_set(){

    return new Promise( ( resolve ) => {

        config_parser_get_event.on( 'read', configuration_read => {
            resolve( configuration_read )
        } )

        config_parser_get_event.on( 'proceed', () => resolve( [ 'proceed' ] ) )
    } )
}
