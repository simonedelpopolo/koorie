import application from './application.js'
import { default as mime_types } from '../mime-types.js'

const get_applicationSymbol = Symbol( 'Object [ koorie.resource.mime_types.get_application ]' )
const get_application = Object.defineProperty( mime_types, get_applicationSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.mime_types.get_application ]
     * returns a collection of application file extensions.
     *
     * @returns {string[]}
     */
    value: function resource_get_application() {
        return application
    }
} )

export default get_application[ get_applicationSymbol ]
