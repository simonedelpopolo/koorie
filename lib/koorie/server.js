import koorie from '../koorie.js'
import { null_ } from 'oftypes'
import { server_resolvers } from '../../index.js'

export let workers_flags = {}

const serverSymbol = Symbol( 'Object [ koorie.server ]' )
const server = Object.defineProperty( koorie, serverSymbol, {
    configurable: false,
    enumerable: true,
    writable: false,

    /**
     * Object [ koorie.server ].
     *
     * @param {KoorieServerArgumentProperties} flags - Parsed arguments.
     * @returns {Promise<void>}
     */
    value: async function server( flags ) {

        // - todo export values to be available all around the place. so the ENVIRONMENT VARIABLE can be set while spinning-up koorie.
        process.env.PORT = process.env.PORT || '3001'
        process.env.ADDRESS = process.env.ADDRESS || 'localhost'
        process.env.FORKED = process.env.FORKED || 'false'
        process.env.PROTOCOL = process.env.PROTOCOL || 'http'
        process.env.LIBRARY = process.env.LIBRARY || 'false'
        process.env.LOGGER_QUIET = process.env.LOGGER_QUIET || 'false'
        process.env.LOGGER_FILENAME = process.env.LOGGER_FILENAME || 'null'
        process.env.RESPONSE_TIME = process.env.RESPONSE_TIME || 'true'
        process.env.HTTP2 = process.env.HTTP2 || 'false'
        process.env.SECURE = process.env.SECURE || 'false'
        process.env.SECURE_KEY = process.env.SECURE_KEY || 'null'
        process.env.SECURE_CERT = process.env.SECURE_CERT || 'null'
        process.env.SECURE_DHPARAM = process.env.SECURE_DHPARAM || 'null'
        process.env.SOCKET_ACTIVE = process.env.SOCKET_ACTIVE || 'false'
        process.env.SOCKET_PATH = process.env.SOCKET_PATH || 'null'
        process.env.SILENCED = process.env.SILENCED || 'false'
        process.env.HOT = process.env.HOT || 'false'
        process.env.HEALTH_KEY = process.env.HEALTH_KEY || 'false'
        process.env.EJECTED = process.env.EJECTED || 'false';

        ( await null_( flags, await server_resolvers( flags ) ) )()
    },
} )

export default server[ serverSymbol ]
