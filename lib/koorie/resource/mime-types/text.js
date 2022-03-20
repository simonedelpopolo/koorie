import { default as mime_types } from '../mime-types.js'

const textSymbol = Symbol( 'Object [ koorie.resource.mime_types.text ]' )
const text = Object.defineProperty( mime_types, textSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.mime_types.text ]
     * Collection of text extension available by default. it sets the correct mime/type for content-type header property.
     * what is not collected, let the browser decide.
     *
     * @private
     * @type {string[]}
     */
    value: [
        '.css',
        '.htm',
        '.html',
        '.mjs',
        '.js',
    ]
} )

export default text[ textSymbol ]
