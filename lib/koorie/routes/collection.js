import { default as routes } from '../routes.js'

const collectionSymbol = Symbol( 'Object [ koorie.routes.collection ]' )
const collection = Object.defineProperty( routes, collectionSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.routes.collection ]
     */
    value: [],
} )

export default collection[ collectionSymbol ]
