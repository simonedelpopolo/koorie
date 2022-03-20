import { default as resource } from '../resource.js'

const mime_typesSymbol = Symbol( 'Object [ koorie.resource.mime_types ]' )
const mime_types = Object.defineProperty( resource, mime_typesSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.mime_types ]
     * extends Object [ koorie.resource ]
     *
     * @private
     * @type {Object}
     */
    value: {}
} )

export default mime_types[ mime_typesSymbol ]
