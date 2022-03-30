import { default as binary } from '../../../binary.js'

const writerSymbol = Symbol.for( 'Object [ binary.koorie.log.writer ]' )
const writer = Object.defineProperty( binary[ Symbol.for( 'Object [ binary ]' ) ], writerSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    value: {}
} )

export default writer[ writerSymbol ]
