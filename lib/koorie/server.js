import koorie from '../koorie.js'
import { null_ } from 'oftypes'
import { server_resolvers } from '../exporter.js'

export let workers_flags = {}

/**
 * @type {symbol}
 */
export const serverSymbol = Symbol( 'Lightweight server' )
export const server = Object.defineProperty( koorie, serverSymbol, {
    configurable: false,
    enumerable: true,
    writable: false,

    /**
     * Lightweight server.
     *
     * @param {{
     *      a:string,address:string,
     *      c:number,cluster:number,
     *      false_flag:boolean|undefined,
     *      hot:undefined,
     *      l:boolean, logger:boolean,
     *      lb:string, library: string,
     *      m:string, middleware:string,
     *      p:number,port:number,
     *      r:string,response_time:string,
     *      s:string,static_files:string,
     *   } |
     *      null} flags - Parsed arguments.
     * @returns {Promise<void>}
     */
    value: async function server( flags = null ) {

        // - todo export values to be available all around the place. so the ENVIRONMENT VARIABLE can be set while spinning-up koorie.
        process.env.PORT = process.env.PORT || '3001'
        process.env.ADDRESS = process.env.ADDRESS || 'localhost'
        process.env.PROTOCOL = process.env.PROTOCOL || 'http'
        process.env.LIBRARY = process.env.LIBRARY || 'false'
        process.env.LOGGER_QUIET = process.env.LOGGER_QUIET || 'false'
        process.env.LOGGER_FILENAME = process.env.LOGGER_FILENAME || 'null'
        process.env.RESPONSE_TIME = process.env.RESPONSE_TIME || 'true'
        process.env.SOCKET_ACTIVE = process.env.SOCKET_ACTIVE || 'false'
        process.env.SOCKET_PATH = process.env.SOCKET_PATH || 'null'
        process.env.HOT = process.env.HOT || 'false';

        ( await null_( flags, await server_resolvers( flags ) ) )()
    },
} )
