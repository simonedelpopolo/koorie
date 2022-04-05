import { extname } from 'node:path'
import { default as model } from '../model.js'
import { hot, model_read, resource_get_public, routes_get } from '../../../index.js'

const selectorSymbol = Symbol( 'Object [ koorie.model.selector ]' )
const selector = Object.defineProperty( model, selectorSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.model.selector ]
     * helper function for route and static files.
     *
     * @param {string} filename - request filename.
     * @returns {Promise<Readable|Error|number|string>|Readable|Error|number|string}
     */
    value: async function selector( filename ){

        const routesKeys = Object.keys( await routes_get() )
        const public_path = resource_get_public()
        const route = filename.replace( `${public_path}/`, '' ).split( '/' )

        if( routesKeys.includes( route[ 0 ] ) )

            return 'route'

        else if( route[ 0 ] === '' )

            return model_read( `${public_path}/index.html` )

        else if( routesKeys.includes( '*' ) )

            return hot( '*' )

        else if( extname( filename ) === '' ) {

            if ( !( routesKeys.includes( route[ 0 ] ) ) )
                return -1
        }

        else return model_read( filename )
    }
} )

export default selector[ selectorSymbol ]
