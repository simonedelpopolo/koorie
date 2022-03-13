import {
    Answer__,
    api__,
    body__,
    cluster_types__,
    entry_point__,
    exit__,
    fork__,
    hot__,
    http__,
    https__,
    init__,
    library__, library_read__,
    logger__,
    memory__,
    options__,
    outgoing__,
    parser__,
    performance__,
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
    socket__, ssl__,
    stderr__,
} from './lib/exporter.js'


/**
 * Object [ activity ]
 *
 * @public
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
 * @public
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
 * @public
 */
/**
 * @type {{commands: 1, flags: 2, type_checking:3,internal:4}}
 */
export const shell_exit_codes = shell_exit_codes__

/**
 * Extends.
 *
 * @public
 */
/**
 * Extends Promise and incorporate Object [ koorie.request ]
 * Answer is used into routes to return responses.
 */
export const Answer = Answer__

/**
 * Object [ input ]
 *
 * @public
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
 * @public
 */

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
 * @returns {Promise<boolean|Buffer|Error> | boolean|Buffer|Error}
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
 * Object [ koorie.query ].
 *
 * @param {string} url - the url requested from the browser.
 * @returns {Promise<void>}
 */
export async function query( url ){
    return query__( url )
}

/**
 * @type {{path: *[], query_: null, post: ((function(*, *): Promise<*|{invalid: string}>)|*), body_: null, query: (function(*): Promise<*>), get: ((function(*, *): Promise<*|{invalid: string}>)|*), body: ((function(*): Promise<*|PromiseFulfilledResult<Object>|PromiseRejectedResult<string>|{empty: string}>)|*)}}
 */
export const request = request__

/**
 * @type {{get_path: (function(): Promise<string|*>), images: string[], finally: (function(*=): Promise<boolean>), push_application_ext: ((function(*): Promise<void>)|*), get_public: (function(): Promise<string|*>), path: string, public: string, application: string[], set_public: ((function(*=): Promise<void>)|*), push_image_ext: ((function(*): Promise<void>)|*), push_text_ext: ((function(*): Promise<void>)|*), text: string[], path_length: ((function(*): Promise<void>)|*)}}
 */
export const resource = resource__

/**
 * @type {{route: {}, set: ((function(): Promise<void>)|*), get: (function(*): Promise<*|PromiseFulfilledResult<*>>), list: *[]}}
 */
export const routes = routes__

/**
 * Dispatches the server requests/responses.
 *
 * @param {{requested_resource:string,server:{incoming:IncomingMessage, outgoing:ServerResponse}}} parameters - The given object parameters.
 * @returns {Promise<unknown>}
 */
export async function routing( parameters ){
    return routing__( parameters )
}

/**
 * Object [ koorie.server].
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
 *      secure:string,
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
 * @public
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
 * @public
 */
/**
 * API hot.
 *
 * @param {Socket} socket_ - .
 * @param {Object<{HOT:string}>} opts - .
 * @returns {Promise<void>}
 */
export async function api_hot( socket_, opts ) {
    return api__.hot( socket_, opts )
}

/**
 * API memory.
 *
 * @param {Socket} socket_ - .
 * @param {number=} refresh_rate - .
 * @returns {Promise<void>}
 */
export async function api_memory ( socket_, refresh_rate ) {
    return api__.memory( socket_, refresh_rate )
}

// Object [ shell.performance ]
/**
 * Through socket connection to koorie, koorie-shell will get some performance.
 *
 * @param {{refresh_rate:number, socket_path: string}} options - on the fly options to koorie.
 * @returns {Promise<void>}
 */
export async function performance( options ){
    return performance__( options )
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
 * The IncomingMessage body.
 *
 * @param {IncomingMessage} raw - Raw body of the incoming request.
 * @returns {Promise<*>}
 */
export async function body( raw ){
    return body__( raw )
}


/**
 * Object [ shell ].
 *
 * @public
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
