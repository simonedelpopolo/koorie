import { is_json, parse } from 'json-swiss-knife'

/**
 * Object [ koorie.request.body.get ].
 *
 * @param {Buffer} raw - get the parsed message body.
 * @returns {Promise<{[p:string]:any}|{empty:string}>|{[p:string]:any}|{empty: string}}
 */
export default async function get( raw ){
    if( raw.length > 0 && await is_json( raw ) )
        return parse( raw )

    return { empty:'using Objects [ koorie.request.xxx ] without setting body to the REQUEST?' }
}
