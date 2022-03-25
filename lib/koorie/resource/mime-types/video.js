import { default as mime_types } from '../mime-types.js'

const videoSymbol = Symbol( 'Object [ koorie.resource.mime_types.video ]' )
const video = Object.defineProperty( mime_types, videoSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.mime_types.video ]
     * Collection of video extension available by default. it sets the correct mime/type for content-type header property.
     * what is not collected, let the browser decide.
     *
     * @private
     * @type {string[]}
     */
    value: [
        '.mp4'
    ]
} )

export default video[ videoSymbol ]
