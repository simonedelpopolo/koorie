import  { arguments__ } from './lib/arguments/exporter.js'
import { init__ } from './lib/shell/exporter.js'
import koorie from './lib/koorie.js'
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
import { koorieErrors__, serverErrors__, shell_exit_codes__ } from './lib/errors/exporter.js'
import { process_exit_, stderr_ } from './lib/activity/exporter.js'

export const protocol = protocol__
export const resource = resource__
export const koorieIncoming = incoming__
export const serverErrors = serverErrors__
export const koorieErrors = koorieErrors__
export const shell_exit_codes = shell_exit_codes__
export const domain = domain__
export const koorie__ = koorie
export const process_exit = process_exit_
export const stderr = stderr_
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
 * @param {string} static_files - Static files absolute path (directory `public`).
 * @returns {Promise<void>}
 */
export async function fork( options, static_files ) {
    return fork__( options, static_files )
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
 * The IncomingMessage body.
 *
 * @param {IncomingMessage} raw - Raw body of the incoming request.
 * @returns {Promise<*>}
 */
export async function body( raw ){
    return body__( raw )
}

/**
 * Query URL.
 *
 * @param {string} url - The given url.
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
