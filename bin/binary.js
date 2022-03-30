import * as Module from 'node:module'

const binary = Object.create( Module )
export default binary

Object.defineProperty( binary, Symbol.for( 'Object [ binary ]' ), {
    enumerable: true,
    writable:false,
    configurable: false,
    value : {}
} )
