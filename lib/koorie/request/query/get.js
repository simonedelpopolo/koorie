import { default as query } from '../query.js'

const getSymbol = Symbol( 'Object [ koorie.request.query.get ]' )
const get = Object.defineProperty( query, getSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.request.query.get ].
     *
     * @param {URLSearchParams} params - get the parsed params.
     * @returns {Promise<URLSearchParams|{empty:string}>|URLSearchParams|{empty: string}}
     */
    value: async function get( params ){
        if( Array.from( params ).length > 0 )
            return params

        return { empty:'using Objects [ koorie.request.get ] without setting params to the GET?' }
    },
} )

export default get[ getSymbol ]
