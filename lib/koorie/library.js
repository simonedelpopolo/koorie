import koorie from '../koorie.js'
import { library_read } from '../../index.js'

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
     * @returns {Promise<boolean|Buffer|Error> | boolean|Buffer|Error}
     */
    value: async function library( name, resources ){

        if ( name === 'false' )
            return library_read( resources )

        switch ( name ) {

            case 'react':

                return library_read( resources )

            case 'solid':
                return library_read( resources )

            case 'static':
                return library_read( resources )

            default:

                return false

        }

    }
} )

export default library[ librarySymbol ]
