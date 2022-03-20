import { default as mime_types } from '../mime-types.js'

const imagesSymbol = Symbol( 'Object [ koorie.resource.mime_types.images ]' )
const images = Object.defineProperty( mime_types, imagesSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.mime_types.images ]
     * Collection of images extension available by default. it sets the correct mime/type for content-type header property.
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

export default images[ imagesSymbol ]
