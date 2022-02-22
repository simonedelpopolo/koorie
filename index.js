import koorie from './lib/koorie.js'
import {
    body__,
    domain__,
    entry_point__,
    fork__,
    hot__,
    incoming__,
    init__,
    library__,
    logger__,
    outgoing__,
    parser__,
    process_exit__,
    process_title__,
    protocol__,
    query__,
    resource__,
    routes__,
    routing__,
    server__,
    shell_exit_codes__,
    stderr__
} from './lib/exporter.js'

export const entry_point = entry_point__
export const process_title = process_title__
export const protocol = protocol__
export const resource = resource__
export const koorieIncoming = incoming__
export const shell_exit_codes = shell_exit_codes__
export const domain = domain__
export const koorie__ = koorie
export const stderr = stderr__
export const routes = routes__
export const config_get = parser__.get
export const config_set = parser__.set

/**
 * Exits with message and exit code.
 *
 * @param {string|Buffer} message - Required argument.
 * @param {Error} [error_type] - Default set to Error('koorie - InternalError').
 * @param {number} [exit_code=101] - Default set to 101, process exit code.
 * @returns {Promise<void>}
 */
export async function process_exit( message, error_type = Error( 'koorie - InternalError' ), exit_code = 101 ){
    return process_exit__( message, error_type, exit_code )
}

/**
 * Switcher function for different javascript library to be served with koorie.
 * ReactJS, SolidJS and others soon.
 *
 * @param {string} name - The process.env.LIBRARY value will be the switcher.
 * @param {{filename:string, public_path:string}} resources - The requested resource from the browser.
 * @returns {Promise<boolean|Buffer|Error>}
 */
export function library( name, resources ){
    return library__( name, resources )
}

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
 * @param {number|string|boolean} cpus - Parsed arguments. If is set 0 it will use all the available CPUs.
 * @param {{path:string, flag:string}} static_files - Static files absolute path (directory `public`).
 * @returns {Promise<void>}
 */
export async function fork( cpus, static_files ) {
    return fork__( cpus, static_files )
}

/**
 * Dynamic importing route without the need for the server to be restarted, if the flag --hot has given.
 * Otherwise, return the asyncFunction registered in the middleware.js.
 *
 * @param {string} route - The route passed from koorie.routing.
 * @returns {(incoming:IncomingMessage, outgoing:ServerResponse)=>Answer}
 */
export async function hot( route ){
    return hot__( route )
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
 * Lightweight server.
 *
 * @param {{p:string,port:string,a:string,address:string,c:string,cluster:string|object,s:string,'static-files':string}|null} flags - Parsed arguments.
 * @returns {Promise<void>}
 */
export async function server( flags ){
    return server__( flags )
}
