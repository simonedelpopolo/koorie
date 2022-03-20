import { default as public__ } from './public.js'
import resource from '../resource.js'

const get_publicSymbol = Symbol( 'Object [ koorie.resource.get_public ]' )
const get_public = Object.defineProperty( resource, get_publicSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.get_public ]
     * returns the path of the public file from requests.
     *
     * @returns {string}
     */
    value: function resource_get_public() {
        return public__[ 0 ]
    }
} )

export default get_public[ get_publicSymbol ]
