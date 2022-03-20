import { extname } from 'node:path'
import koorie from '../koorie.js'
import { library_read, resource_get_public, routes_get } from '../../index.js'

const librarySymbol = Symbol( 'Object [ koorie.library ]' )
const library = Object.defineProperty( koorie, librarySymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Switcher function for different javascript library to be served with koorie.
     * ReactJS, SolidJS and others soon.
     *
     * @param {string} name - The process.env.LIBRARY value will be the switcher.
     * @param {{filename:string, public_path:string}} resources - The requested resource from the browser.
     * @returns {Promise<boolean|Buffer|Error|string> | boolean|Buffer|Error|string}
     */
    value: async function library( name, resources ){

        /**
         * Double-check the route from Object [ koorie.routing ].
         *
         * @returns {Promise<Buffer|(void&Error)|string> |Buffer|(void&Error)|string}
         */
        async function double_check_route(){
            const public_path = resource_get_public()
            const routesKeys = Object.keys( await routes_get() )
            const route = resources.filename.replace( `${public_path}/`, '' ).split( '/' )

            if( route[ 0 ] === '' )
                return library_read( resources )
            else if( extname( resources.filename ) === '' ) {
                if ( !( routesKeys.includes( route[ 0 ] ) ) )
                    return 'no_route'
            }else
                return library_read( resources )

        }

        if ( name === 'false' )
            return double_check_route()

        switch ( name ) {

            case 'react':

                return double_check_route()

            case 'solid':
                return double_check_route()

            case 'static':
                return double_check_route()

            default:

                return false

        }

    }
} )

export default library[ librarySymbol ]
