import { EventEmitter } from 'node:events'
import { default as writer } from '../writer.js'

const eventSymbol = Symbol.for( 'Object [ binary.koorie.log.writer.event ]' )
const event = Object.defineProperty( writer, eventSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    value: new EventEmitter(),
} )

export default event[ eventSymbol ]
