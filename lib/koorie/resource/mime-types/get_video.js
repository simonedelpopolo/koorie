import { default as mime_types } from '../mime-types.js'
import video from './video.js'

const get_videoSymbol = Symbol( 'Object [ koorie.resource.mime_types.get_video ]' )
const get_video = Object.defineProperty( mime_types, get_videoSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.mime_types.get_video ]
     * returns a collection of video file extensions.
     *
     * @returns {string[]}
     */
    value: function resource_get_images() {
        return video
    }
} )

export default get_video[ get_videoSymbol ]
