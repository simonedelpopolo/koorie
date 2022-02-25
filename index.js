import {
    body__,
    entry_point__,
    fork__,
    hot__,
    init__,
    library__,
    logger__,
    options__,
    outgoing__,
    parser__,
    process_exit__,
    process_title__,
    processor__,
    query__,
    request__,
    resource__,
    routes__,
    routing__,
    server__,
    set__,
    shell_exit_codes__,
    socket__,
    stderr__,
} from './lib/exporter.js'

export const resource = resource__
export const request = request__
export const shell_exit_codes = shell_exit_codes__
export const stderr = stderr__
export const routes = routes__
export const config_get = parser__.get
export const config_set = parser__.set

// - Object [input]             ____

/**
 * Object [input.entry_point].
 * Shared entry point for the available executable files.
 * Its return an object from the given process.argv.
 * Object [input.process_title] elaborates commands, flags and options dispatching to the right process switching the process.title.
 *
 * @param {string[]} argv - The process.argv passed to the process.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return#using_return
 * @returns {Promise | object} - return the return of the async function generator to set it "done" and free resources.
 */
export async function entry_point( argv ) {
    return entry_point__( argv )
}

/**
 * Switches process.title returning an object containing command, flags and options to be digested.
 * The returned Promise always resolves.
 *
 * @param {{object:{[p: string]: any}, keys:string[]}} process_parsed_argv - Object.
 * @returns {AsyncGenerator}
 */
export async function process_title( process_parsed_argv ) {
    return process_title__( process_parsed_argv )
}

/**
 * Object [ input.argv ] parses the process.argv string[] and returns an object.
 *
 * @param { string[] } argv - the given process.argv.
 * @returns { Promise<{ object:{ [ p: string ]: any }, keys:string[] }> }
 */
export async function processors( argv ){
    return processor__( argv )
}

/**
 * Object [ input.options ] parses, if any, the options given to the flag.
 *
 * @param { string }flag_value - the flag value passed to cli.
 * @param { string }flag_name - flag name in case of error while parsing the options.
 * @returns { Promise<{ [ p:string ]:{ [ p:string ], any} }> }
 */
export async function options( flag_value, flag_name ){
    return options__( flag_value, flag_name )
}

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
 * Through socket connection to koorie, koorie-shell can edit some koorie options without restarting it.
 *
 * @param {{hot:string, inject:string}} options - on the fly options to set into koorie.
 * @returns {Promise<void>}
 */
export async function set( options ){
    return set__( options )
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
 * @param {Object<ServerResponse>} outgoing - .
 * @returns {Promise<void>}
 */
export async function outgoing( response, outgoing ){
    return outgoing__( response, outgoing )
}

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
 *      ml:string, middleware:string,
 *      p:number,port:number,
 *      pr:string,protocol:string,
 *      rt:string,response_time:string,
 *      s:string,static_files:string,
 *   } |
 *      null} flags - Parsed arguments.
 * @returns {Promise<void>}
 */
export async function server( flags ){
    return server__( flags )
}



/**
 * Socket connection to koorie.
 *
 * @param {{path:string}} options - socket options.
 * @returns {Promise<void>}
 */
export async function socket( options ){
    return socket__( options )
}
