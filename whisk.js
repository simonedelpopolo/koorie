import { init__ } from './lib/cli/exporter.js'
import koorie from './lib/koorie.js'
import  { arguments__, process_exit_, stderr_ } from './lib/flags/exporter.js'
import {
    body__,
    domain__,
    fork__,
    incoming__,
    logger__,
    outgoing__,
    protocol__,
    query__,
    resource__,
    routes__,
    routing__,
    server__,
} from './lib/koorie/exporter.js'
import { koorieErrors__, terminalErrors__ } from './lib/errors/exporter.js'

export const protocol = protocol__
export const resource = resource__
export const koorieIncoming = incoming__
export const koorieErrors = koorieErrors__
export const terminalErrors = terminalErrors__
export const domain = domain__
export const koorie__ = koorie
export const process_exit = process_exit_
export const routes = routes__

/**
 * Initialization script. An object from a json string passed to the terminal.
 * The arguments it is not required.
 *
 * @param {{name:string=,description:string=,version:string=}=} options - The json parsed options.
 * @returns {Promise<void>}
 * @example npx koorie init='{"name":"my-app", "description":"my frivolous app"}'
 */
export async function init( options ){
    return init__( options )
}

/**
 * Wrap to process.stderr.write.
 *
 * @param {string|any} message - The message to the stderr.
 * @returns {any}
 */
export function stderr( message ){
    return stderr_( message )
}

/**
 * Argument Parser.
 *
 * @param {string[]} args - Given arguments from terminal.
 * @returns {Promise<unknown>}
 */
export async function flags( args ){
    return arguments__( args )
}

/**
 * Handles the server log.
 *
 * @param {{quiet:boolean, write:{disk:boolean, filename:string}=,info:any[]}} options - Infos.
 * @returns {*}
 */
export async function logger( options ){
    return logger__( options )
}

/**
 * Handles the cluster and forks.
 *
 * @param {{cpus:number,init:string}|number} options - Parsed arguments.
 * @param static_flags
 * @returns {Promise<void>}
 */
export async function fork( options, static_flags ) {
    return fork__( options, static_flags )
}

/**
 * Dispatcher.
 *
 * @param {object} parameters - .
 * @returns {Promise<*>}
 */
export async function routing( parameters ){
    return routing__( parameters )
}

/**
 *
 * @param raw
 * @returns {Promise<*>}
 */
export async function body( raw ){
    return body__( raw )
}

/**
 *
 * @param raw
 * @param url
 * @returns {Promise<*>}
 */
export async function query( url ){
    return query__( url )
}

/**
 *  Routing.
 *
 * @param {{buffer:Buffer, log:object}|{log:object}} response - .
 * @param {ServerResponse} outgoing - .
 * @returns {Promise<void>}
 */
export async function outgoing( response, outgoing ){
    return outgoing__( response, outgoing )
}

/**
 * Lightweight server for react-dang app.
 *
 * @param {{p:string,port:string,a:string,address:string,c:string,cluster:string|object,s:string,'static-files':string}|null} flags - Parsed arguments.
 * @returns {Promise<void>}
 */
export async function server( flags ){
    return server__( flags )
}
