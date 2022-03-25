import image from './image.js'
import { default as mime_types } from '../mime-types.js'

const get_imageSymbol = Symbol( 'Object [ koorie.resource.mime_types.get_image ]' )
const get_image = Object.defineProperty( mime_types, get_imageSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.mime_types.get_image ]
     * returns a collection of images file extensions.
     *
     * @returns {string[]}
     */
    value: function resource_get_image() {
        return image
    }
} )

export default get_image[ get_imageSymbol ]
