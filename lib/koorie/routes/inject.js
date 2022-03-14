import { default as collection } from './collection.js'
import { default as routes } from '../routes.js'

const injectSymbol = Symbol( 'Object [ koorie.routes.inject ]' )
const set = Object.defineProperty( routes, injectSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.routes.inject ].
     *
     * @param {{}} route - the route imported or ejected
     */
    value:  async function inject ( route ){

        collection.push( route )
    }
} )

export default set[ injectSymbol ]
