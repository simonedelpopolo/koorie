import koorie from '../koorie.js'

export const incomingSymbol = ( 'server IncomingMessage' )
export const incoming = Object.defineProperty( koorie, incomingSymbol, {
    enumerable:true,
    configurable:true,
    writable:true,
    value: null
} )
