import { default as body } from '../body.js'
import { is_json, parse } from 'json-swiss-knife'

const getSymbol = Symbol( 'Object [ koorie.request.body.get ]' )
const get = Object.defineProperty( body, getSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.request.body.get ].
     *
     * @param {Buffer} raw - get the parsed message body.
     * @returns {Promise<{[p:string]:any}|{empty:string}>|{[p:string]:any}|{empty: string}}
     */
    value: async function get( raw ){
        if( raw.length > 0 && await is_json( raw ) )
            return parse( raw )

        return { empty:'using Objects [ koorie.request.xxx ] without setting body to the REQUEST?' }
    },
} )

export default get[ getSymbol ]
