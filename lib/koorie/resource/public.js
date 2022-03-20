import { default as resource } from '../resource.js'

const publicSymbol = Symbol( 'Object [ koorie.resource.public ]' )
const public__ = Object.defineProperty( resource, publicSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.public ]
     * public directory to retrieve static files from.
     *
     * @private
     * @type {string[]}
     */
    value: []
} )

export default public__[ publicSymbol ]
