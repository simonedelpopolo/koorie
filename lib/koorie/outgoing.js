import koorie from '../koorie.js'

/**
 * @type {symbol}
 */
export const outgoingSymbol = Symbol( 'server ServerResponse' )
export let outgoing = Object.defineProperty( koorie, outgoingSymbol, {
    enumerable: true,
    writable: true,
    configurable: true,
    value: null,
} )
