import { default as mime_types } from '../mime-types.js'

const applicationSymbol = Symbol( 'Object [ koorie.resource.mime_types.application ]' )
const application = Object.defineProperty( mime_types, applicationSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.mime_types.application ]
     * Collection of application extension available by default. it sets the correct mime/type for content-type header property.
     * what is not collected, let the browser decide.
     *
     * @private
     * @type {string[]}
     */
    value: [
        '.json',
    ]
} )

export default application[ applicationSymbol ]
