import images from './images.js'
import { default as mime_types } from '../mime-types.js'

const get_imagesSymbol = Symbol( 'Object [ koorie.resource.mime_types.get_images ]' )
const get_images = Object.defineProperty( mime_types, get_imagesSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.get_images ]
     * returns a collection of images file extensions.
     *
     * @returns {string[]}
     */
    value: function resource_get_images() {
        return images
    }
} )

export default get_images[ get_imagesSymbol ]
