import {
    Answer__,
    api_hot__,
    api_memory__,
    cluster_types__,
    ejected__,
    entry_point__,
    exit__,
    fork__,
    health__,
    hot__,
    http__,
    https__,
    init__,
    library__,
    library_read__,
    logger__,
    memory__,
    options__,
    outgoing__,
    parser__,
    performance__,
    process_title__,
    processor__,
    request__,
    request_body__,
    request_body_get__,
    request_get__,
    request_post__,
    request_query__,
    request_query_get__,
    request_routes__,
    resource__,
    routes_collection__,
    routes_get__,
    routes_inject__,
    routes_injected__,
    routes_set__,
    routing__,
    server__,
    server_resolvers__,
    set__,
    shell_exit_codes__,
    socket__,
    ssl__,
    stderr__,
} from './lib/exporter.js'

/**
 * Object [ activity ]
 *
 * @private
 */
/**
 * Exits with message and exit code.
 *
 * @param {string|Buffer} message - Required argument.
 * @param {Error} [error_type] - Default set to Error('koorie - InternalError').
 * @param {number} [exit_code=101] - Default set to 101, process exit code.
 * @returns {Promise<void>}
 */
export async function process_exit( message, error_type = Error( 'koorie - InternalError' ), exit_code = 101 ){
    return exit__( message, error_type, exit_code )
}

/**
 * Wrap to process.stderr.write.
 *
 * @param {Buffer|string} message - The message to the stderr.
 * @returns {Promise<string> | string}
 */
export async function stderr( message ){
    return stderr__( message )
}

/**
 * Object [ config ]
 *
 * @private
 */
/**
 * Event emitter for the Object [ config.parser ].
 *
 * @returns {*}
 */
export function config_get(){
    return parser__.get()
}

/**
 * Event listener for the parser.get function.
 *
 * @returns {Promise<string[]> | string[]}
 */
export async function config_set(){
    return parser__.set()
}

/**
 * Object [ errors ]
 *
 * @private
 */
/**
 * @type {{commands: 1, flags: 2, type_checking:3,internal:4}}
 */
export const shell_exit_codes = shell_exit_codes__

/**
 * Extends.
 *
 * @private
 */
/**
 * Extends Promise and incorporate Object [ koorie.request ]
 * Answer is used into routes to return responses.
 */
export const Answer = Answer__

/**
 * Object [ input ]
 *
 * @private
 */
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
 * Object [ koorie ].
 *
 * @private
 */

/**
 * Object [ koorie.fork ].
 * Handles the cluster and forks.
 *
 * @param {number|string|boolean} cpus - Parsed arguments. If is set 0 it will use all the available CPUs.
 * @param {{path:string, flag:string}} static_files - Static files absolute path (directory `public`).
 * @param {string} ejected - file to bootstrap koorie ejected state.
 * @returns {Promise<void> | void}
 */
export async function fork( cpus, static_files, ejected ) {
    return fork__( cpus, static_files, ejected )
}

/**
 * Route - health.
 *
 * @param {IncomingMessage} incoming - The given IncomingMessage Object.
 * @param {ServerResponse} outgoing - The given ServerResponse Object.
 * @returns {Promise<{buffer:Buffer}> | {buffer:Buffer}}
 */
export async function health( incoming, outgoing ){
    return health__( incoming, outgoing )
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
 * Object [ koorie.ejected ].
 * This Object type check & start a koorie ejected state.
 *
 * @param {{
 *      port:number,
 *      address:string,
 *      cluster:number,
 *      ejected: string|undefined,
 *      library: string,
 *      logger:{quiet:boolean, write:string},
 *      hot:undefined,
 *      response_time:string,
 *      secure:{active:boolean,key:string,cert:string, dhparam: string},
 *      socket:{active:boolean, path:string},
 *      static_files:string,
 *      false_flag:boolean|undefined} |
 *      null} initializer - the initializer object that replace process.argv
 * @returns {{}}
 */
export async function ejected( initializer ){
    return ejected__( initializer )
}

/**
 * Object [ koorie.library.read ].
 *
 * @param {{filename:string, public_path:string}} resources - request filename and public path.
 * @returns {Promise<Buffer|(void&Error)>|Buffer|(void&Error)}
 */
export async function library_read( resources ){
    return library_read__( resources )
}

/**
 * Switcher function for different javascript library to be served with koorie.
 * ReactJS, SolidJS and others soon.
 *
 * @param {string} name - The process.env.LIBRARY value will be the switcher.
 * @param {{filename:string, public_path:string}} resources - The requested resource from the browser.
 * @returns {Promise<boolean|Buffer|Error|string> | boolean|Buffer|Error|string}
 */
export function library( name, resources ){
    return library__( name, resources )
}

/**
 * Object [ koorie.logger ].
 *
 * **prints, writeFile the server's log**.
 *
 * print to stdout ca be silenced by setting the quiet option to false.
 *
 * when options.write is set to file path
 * the written file on disk, at the specified path,
 * is a json collection of all the requests done.
 * easy to send to an external database.
 *
 * @param {{quiet:boolean, write:string, info:string[]}} options - Infos.
 */
export async function logger( options ){
    return logger__( options )
}

/**
 *  Object [koorie.outgoing ].
 *
 * @param {{buffer:Buffer, log:object}|Error} response - the response to be given back.
 * @param {ServerResponse} outgoing - ref to ServerResponse Object.
 * @returns {Promise<void>}
 */
export async function outgoing( response, outgoing ){
    return outgoing__( response, outgoing )
}

/**
 * Object [ koorie.request.body ].
 *
 * @param {IncomingMessage} raw - the IncomingMessage raw body
 * @returns {Promise<void>|void}
 */
export async function request_body( raw ){
    return request_body__( raw )
}

/**
 * Object [ koorie.query ].
 *
 * @param {string} url - the url requested from the browser.
 * @returns {Promise<void>}
 */
export async function request_query( url ){
    return request_query__( url )
}

/**
 * Object [ koorie.request.body.get ].
 *
 * @param {Buffer} raw - get the parsed message body.
 * @returns {Promise<{[p:string]:any}|{empty:string}>|{[p:string]:any}|{empty: string}}
 */
export async function request_body_get( raw ){
    return request_body_get__( raw )
}

/**
 * Object [ koorie.request.query.get ].
 *
 * @param {URLSearchParams} params - get the parsed params.
 * @returns {Promise<URLSearchParams|{empty:string}>|URLSearchParams|{empty: string}}
 */
export async function request_query_get( params ){
    return request_query_get__( params )
}

/**
 * @type {string[]}
 */
export const request_routes = request_routes__

/**
 * Object [ koorie.request.post ].
 *
 * @param {Buffer} raw - the raw body.
 * @param {string} path - routes path that responds to the request.
 * @returns {Promise<{[p: string]: any} | {empty: string}|{invalid:string}> |  {[p: string]: any} | {empty: string} | {invalid:string}}
 */
export async function request_post( raw, path ){
    return request_post__( raw, path )
}

/**
 * Object [ koorie.request.get ].
 *
 * @param {URLSearchParams} query - the query params.
 * @param {string} path - routes path that responds to the request.
 * @returns {Promise<URLSearchParams | {empty: string}|{invalid:string}> | URLSearchParams | {empty: string} | {invalid:string}}
 */
export async function request_get( query, path ){
    return request_get__( query, path )
}

/**
 * Get body, params and clear on response.
 *
 * @param {string} action - only accept 'insert', 'retrieve', 'clear'
 * @param {string|undefined} type - only accept 'body' OR 'params'
 * @param {Buffer|URLSearchParams|undefined} data - the data to be inserted in the registry
 * @returns {Promise<Buffer|URLSearchParams|ReferenceError>|Buffer|URLSearchParams|ReferenceError}
 */
export async function request ( action, type= undefined, data = undefined ){
    return request__( action, type, data )
}

/**
 * @type {{get_path: (function(): Promise<string|*>), images: string[], finally: (function(*=): Promise<boolean>), push_application_ext: ((function(*): Promise<void>)|*), get_public: (function(): Promise<string|*>), path: string, public: string, application: string[], set_public: ((function(*=): Promise<void>)|*), push_image_ext: ((function(*): Promise<void>)|*), push_text_ext: ((function(*): Promise<void>)|*), text: string[], path_length: ((function(*): Promise<void>)|*)}}
 */
export const resource = resource__

/**
 * @type {object[]}
 */
export const routes_collection = routes_collection__

/**
 * Object [ koorie.routes.get ].
 *
 * @param {string=} name - route registered name.
 * @returns {Promise<*|PromiseFulfilledResult<*>>}
 */
export async function routes_get( name ){
    return routes_get__( name )
}

/**
 * Object [ koorie.routes.inject ].
 *
 * @param {{}} route - the route imported or ejected
 */
export async function routes_inject( route ){
    return routes_inject__( route )
}

/**
 * @type {Object}
 */
export const routes_injected = routes_injected__

/**
 * Object [ koorie.routes.set ].
 *
 * @returns {Promise<void>|void}
 */
export async function routes_set(){
    return routes_set__()
}

/**
 * Dispatches the server requests/responses.
 *
 * @param {{requested_resource:string,server:{incoming:IncomingMessage, outgoing:ServerResponse}}} parameters - The given object parameters.
 * @returns {Promise<unknown>}
 */
export async function routing( parameters ){
    return routing__( parameters )
}

// - koorie.server properties
/**
 * Resolvers for oftypes undefined_ function.
 *
 * @param {{
 *      port:number,
 *      address:string,
 *      cluster:number,
 *      ejected: string|undefined,
 *      library: string,
 *      logger:{quiet:boolean, write:string},
 *      hot:undefined,
 *      response_time:string,
 *      secure:{active:boolean,key:string,cert:string, dhparam: string},
 *      socket:{active:boolean, path:string},
 *      static_files:string,
 *      false_flag:boolean|undefined} |
 *      null} flags - Parsed arguments.
 * @returns {Promise<{false: ((function(): Promise<void>)|*), true: ((function(): Promise<void>)|*)}>}
 */
export async function server_resolvers( flags ){
    return server_resolvers__( flags )
}

/**
 * Object [ koorie.server].
 *
 * @param {{
 *      port:number,
 *      address:string,
 *      cluster:number,
 *      ejected: string|undefined,
 *      library: string,
 *      logger:{quiet:boolean, write:string},
 *      hot:undefined,
 *      response_time:string,
 *      secure:{active:boolean,key:string,cert:string, dhparam: string},
 *      socket:{active:boolean, path:string},
 *      static_files:string,
 *      false_flag:boolean|undefined} |
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

/**
 * Type check for cluster given flags.
 *
 * @param {number|string|boolean} options - given flag.
 * @returns {AsyncGenerator<boolean|(function(*): Promise<void>)|*|Promise<number>|Promise<unknown>|Promise<number>|Promise<never>, void, *>}
 */
export async function cluster_types( options ){
    return cluster_types__( options )
}

/**
 * HTTP server.
 *
 * @returns {Promise<Server> | Server}
 */
export async function http(){
    return http__()
}

/**
 * Object [ koorie.server.https ].
 *
 * @param {string} key - path to the key file.
 * @param {string} cert - path to the cert file
 * @param {string|null=} dhparam - path to the dhparam file.
 * @returns {Promise<Server> | Server}
 */
export async function https( key, cert, dhparam = null ){
    return https__( key, cert, dhparam )
}

/**
 * Object [ monitor ]
 *
 * @private
 */
/**
 * Get the memory usage statistic of the application.
 * Require a socket connection.
 *
 * @returns {
 *   Promise<{[unknown]:string, [p:string]:NodeJS.MemoryUsage}> |
 *   {unknown: string, [p: string]: NodeJS.MemoryUsage}
 *   }
 */
export async function memory(){
    return memory__()
}

/**
 * Object [ koorie.api ]
 *
 * @private
 */
/**
 * API hot.
 *
 * @param {Socket} socket_ - .
 * @param {Object<{HOT:string}>} opts - .
 * @returns {Promise<void>}
 */
export async function api_hot( socket_, opts ) {
    return api_hot__( socket_, opts )
}

/**
 * API memory.
 *
 * @param {Socket} socket_ - .
 * @param {number=} refresh_rate - .
 * @returns {Promise<void>}
 */
export async function api_memory ( socket_, refresh_rate ) {
    return api_memory__( socket_, refresh_rate )
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
 * Object [ shell ].
 *
 * @private
 */

/**
 * Object [ shell.ssl ]
 * Generate self-signed certificate with OpenSSL.
 * ❗️OpenSSL must be available on host OS.
 *
 * @param {{path:string|boolean,key:string|boolean,cert:string|boolean,dhparam:string|boolean}} options - self-signed certificate options.
 * @returns {Promise<void>}
 */
export async function ssl( options ) {
    return ssl__( options )
}

/**
 * Object [ shell.performance ]
 *
 * @private
 */
/**
 * Through socket connection to koorie, koorie-shell will get some performance.
 *
 * @param {{refresh_rate:number, socket_path: string}} options - on the fly options to koorie.
 * @returns {Promise<void>}
 */
export async function performance( options ){
    return performance__( options )
}
