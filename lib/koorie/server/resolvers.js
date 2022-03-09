import { address } from './functions/address.js'
import { cluster } from './functions/cluster.js'
import { hot } from './functions/hot.js'
import { library } from './functions/library.js'
import { logger } from './functions/logger.js'
import { port } from './functions/port.js'
import { protocol } from './functions/protocol.js'
import { response_time } from './functions/response_time.js'
import { set_publicEvent } from '../resource.js'
import { socket } from './functions/socket.js'
import { static_files } from './functions/static_files.js'
import { undefined_resolver } from './functions/undefined_resolver.js'
import { server, serverSymbol } from '../server.js'

const server_resolversSymbol = Symbol( 'Object [ koorie.server.resolvers ] oftypes resolvers for flags' )
const server_resolvers = Object.defineProperty( server[ serverSymbol ], server_resolversSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: {

        /**
         * Resolvers for oftypes undefined_ function.
         *
         * @param {{
         *      p:number,port:number,
         *      a:string,address:string,
         *      c:number,cluster:number,
         *      lb:string, library: string,
         *      l:{quiet:boolean, write:string}, logger:{quiet:boolean, write:string},
         *      hot:undefined,
         *      pr:string,protocol:string,
         *      r:string,response_time:string,
         *      sk:{active:boolean,path:string}, socket:{active:boolean, path:string},
         *      s:string,static_files:string,
         *      false_flag:boolean|undefined,} |
         *      null} flags - Parsed arguments.
         * @returns {Promise<{false: ((function(): Promise<void>)|*), true: ((function(): Promise<void>)|*)}>}
         */
        async resolvers( flags ){

            return {
                false : ( async() => {

                    // Setting address if the flag is not undefined
                    await address( flags.a || flags.address )

                    // Setting library if the flag is not undefined
                    await library( flags.lb || flags.library )

                    // Setting hot if the flag is not undefined
                    await hot( flags.hot )

                    // Setting port if the flag is not undefined
                    await port( flags.port || flags.p )

                    // Setting logger if the flag is not undefined
                    await logger( flags.logger || flags.l )

                    // Setting protocol if the flag is not undefined
                    await protocol( flags.pr || flags.protocol )

                    // Setting response_time if the flag is not undefined
                    await response_time( flags.r || flags.response_time )

                    // Setting socket if the flag is not undefined
                    await socket( flags.sk || flags.socket )

                    // Once the public directory is set, proceed with koorie.fork() and koorie.initialize()
                    set_publicEvent.on( 'done', async static_files => {

                        // Setting cluster if the flag is not undefined
                        await cluster( flags.cluster || flags.c, flags.false_flag, static_files )

                    } )

                    // If static_files is undefined, koorie.resource.set_public(to an empty string)
                    await static_files( flags.s || flags.static_files )
                } ),

                true:( async () => {
                    await undefined_resolver()
                } )
            }
        }
    }
} )

export const server_resolvers__ = server_resolvers[ server_resolversSymbol ].resolvers

