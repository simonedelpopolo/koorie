import { address } from './functions/address.js'
import { cluster } from './functions/cluster.js'
import { ejected } from './functions/ejected.js'
import { health } from './functions/health.js'
import { hot } from './functions/hot.js'
import { library } from './functions/library.js'
import { logger } from './functions/logger.js'
import { port } from './functions/port.js'
import { resolvers } from 'oftypes'
import { default as resource_event_static_files } from '../resource/event/static_files.js'
import { response_time } from './functions/response_time.js'
import { secure } from './functions/secure.js'
import { default as server } from '../server.js'
import { socket } from './functions/socket.js'
import { static_files } from './functions/static_files.js'
import { undefined_resolver } from './functions/undefined_resolver.js'

const server_resolversSymbol = Symbol( 'Object [ koorie.server.resolvers ] oftypes resolvers for flags' )
const server_resolvers = Object.defineProperty( server, server_resolversSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Resolvers for oftypes undefined_ function.
     *
     * @param {KoorieServerArgumentProperties} flags - Parsed arguments.
     * @returns {Promise<{false: ((function(): Promise<void>)|*), true: ((function(): Promise<void>)|*)}>}
     */
    value: async function server_resolvers( flags ){

        const truthy = async () => {
            await undefined_resolver()
        }

        const falsy = async() => {

            // Setting address if the flag is not undefined
            await address( flags.address )

            // Setting library if the flag is not undefined
            await library( flags.library )

            // Setting hot if the flag is not undefined
            await hot( flags.hot )

            // Setting health if the flag undefined
            await health( flags.health )

            // Setting port if the flag is not undefined
            await port( flags.port )

            // Setting logger if the flag is not undefined
            await logger( flags.logger )

            // Setting response_time if the flag is not undefined
            await response_time( flags.response_time )

            // Setting secure if the flag is not undefined
            await secure( flags.secure )

            // Setting socket if the flag is not undefined
            await socket( flags.socket )

            // Once the public directory is set, proceed with koorie.fork() and koorie.initialize()
            resource_event_static_files.on( 'done', async () => {

                // Setting cluster if the flag is not undefined
                await cluster( flags.cluster, process.env.FALSE_FLAG || undefined, await ejected( flags.ejected ) )

            } )

            // If static_files is undefined, koorie.resource.set_public(to an empty string)
            await static_files( flags.static_files )
        }

        return resolvers( truthy, falsy )
    }
} )

export default server_resolvers[ server_resolversSymbol ]

