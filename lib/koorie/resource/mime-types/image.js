import { default as mime_types } from '../mime-types.js'

const imageSymbol = Symbol( 'Object [ koorie.resource.mime_types.image ]' )
const image = Object.defineProperty( mime_types, imageSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.mime_types.image ]
     * Collection of image extension available by default. it sets the correct mime/type for content-type header property.
     * what is not collected, let the browser decide.
     *
     * @private
     * @type {string[]}
     */
    value: [
        '.png',
        '.webp',
        '.jpeg',
        '.ico',
        '.bmp',
        '.svg',
    ]
} )

export default image[ imageSymbol ]
