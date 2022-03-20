import { EventEmitter } from 'events'
import { default as public__ } from '../public.js'

const event_static_filesSymbol = Symbol( 'Object [ koorie.resource.public.event.static_files ]' )
const event_static_files = Object.defineProperty( public__, event_static_filesSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.resource.public.event.static_files ]
     * EventEmitter while setting the public path during start-up the server.
     *
     * @private
     * @type {EventEmitter}
     */
    value: new EventEmitter()
} )

export default event_static_files[ event_static_filesSymbol ]
