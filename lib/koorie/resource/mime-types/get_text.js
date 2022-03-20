import { default as mime_types } from '../mime-types.js'
import text from './text.js'

const get_textSymbol = Symbol( 'Object [ koorie.resource.mime_types.get_text ]' )
const get_text = Object.defineProperty( mime_types, get_textSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.mime_types.get_text ]
     * returns a collection of text file extensions.
     *
     * @returns {string[]}
     */
    value: function resource_get_text() {
        return text
    }
} )

export default get_text[ get_textSymbol ]
