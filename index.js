import { createRequire } from 'module'
import {
    Answer__,
    api_hot__,
    api_memory__,
    cluster_system_check__,
    configuration__,
    dispatcher__,
    ejected__,
    entry_point__,
    exit__,
    fork__,
    health__,
    host_os__,
    hot__,
    http__,
    https__,
    init__,
    logger__,
    memory__,
    model__,
    model_read__,
    model_selector__,
    options__,
    os_uptime__,
    outgoing__,
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
    resource_get_application__,
    resource_get_image__,
    resource_get_public__,
    resource_get_text__,
    resource_get_video__,
    resource_set_public__,
    routes_collection__,
    routes_get__,
    routes_inject__,
    routes_injected__,
    routes_set__,
    routes_set_check__,
    routing__,
    routing_all__,
    routing_file__,
    routing_route__,
    server__,
    server_resolvers__,
    set__,
    shell_exit_codes__,
    socket__,
    ssl__,
    stderr__,
} from './lib/exports.js'

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
 * @returns { Promise<{ [ p:string ]:{ [ p:string ], any} }> | { [ p:string ]:{ [ p:string ], any} } }
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
 * Object [ koorie.configuration ]
 * koorie configuration file function.
 *
 * @param {string=} path - path to your configuration file. Default ./.koorierc in the root directory of the project.
 * @param { boolean=} process_cwd - default the absolute path starts from process.cwd(). set it to false and, it will use just the argument 'path'.
 * @returns {Promise<KoorieServerArgumentProperties> | KoorieServerArgumentProperties}
 */
export async function configuration( path = '.koorierc', process_cwd = true ){
    return configuration__( path, process_cwd )
}

/**
 * Object [ koorie.dispatcher ]
 * ServerRequest event listener.
 *
 * @param {IncomingMessage} Incoming - server request
 * @param {ServerResponse} Outgoing - server response
 * @returns {Promise<void>}
 */
export async function dispatcher( Incoming, Outgoing ) {
    return dispatcher__( Incoming, Outgoing )
}

/**
 * Object [ koorie.ejected ].
 * type check the given argument using Object [ input.koorie_process ] & start a koorie ejected state.
 *
 * @param {KoorieServerArgumentProperties} initializer - the initializer object that replace process.argv
 * @returns {KoorieServerArgumentProperties}
 */
export async function ejected( initializer ){
    return ejected__( initializer )
}

/**
 * Object [ koorie.fork ].
 * Handles the cluster and forks.
 *
 * @param {number|string|boolean} cpus - Parsed arguments. If is set 0 it will use all the available CPUs.
 * @param {string} ejected - file to bootstrap koorie ejected state.
 * @returns {Promise<void> | void}
 */
export async function fork( cpus, ejected ) {
    return fork__( cpus, ejected )
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
 * Object [ koorie.model.read ].
 *
 * @param {string} filename - request filename and public path.
 * @returns {Promise<Readable|Error>|Readable|Error}
 */
export async function model_read( filename ){
    return model_read__( filename )
}

/**
 * Object [ koorie.model.selector ].
 *
 * @param {string} filename - request filename.
 * @returns {Promise<Readable|Error|number|string>|Readable|Error|number|string}
 */
export async function model_selector( filename ){
    return model_selector__( filename )
}

/**
 * Object [ koorie.model ]
 * - Recognizer for routes
 * - Switcher function for different javascript library to be served with koorie.
 *   ReactJS, SolidJS and others soon.
 *
 *
 * @param {string} library_name - The process.env.LIBRARY value will be the switcher.
 * @param {string} filename - The requested resource from the browser.
 * @returns {Promise<boolean|Readable|Error|string> | boolean|Readable|Error|string}
 */
export function model( library_name, filename ){
    return model__( library_name, filename )
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
 * @param {{quiet:Promise<boolean|string>|boolean, write:null|string, info:any[]}} options - Infos.
 */
export async function logger( options ){
    return logger__( options )
}

/**
 *  Object [ koorie.outgoing ].
 *
 * @param {Promise<buffer|undefined>|buffer|undefined} response - the response to be given back.
 * @param {ServerResponse} Outgoing - ref to ServerResponse Object.
 * @returns {Promise<void> | void}
 */
export async function outgoing( response, Outgoing ){
    return outgoing__( response, Outgoing )
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
 * Object [ koorie.resource.mime_types.get_application ]
 * returns a collection of application file extensions.
 *
 * @returns {string[]}
 */
export function resource_get_application() {
    return resource_get_application__()
}

/**
 * Object [ koorie.resource.get_image ]
 * returns a collection of images file extensions.
 *
 * @returns {string[]}
 */
export function resource_get_image() {
    return resource_get_image__()
}

/**
 * Object [ koorie.resource.get_public ]
 * returns the path of the public file from requests.
 *
 * @returns {string}
 */
export function resource_get_public() {
    return resource_get_public__()
}

/**
 * Object [ koorie.resource.mime_types.get_text ]
 * returns a collection of text file extensions.
 *
 * @returns {string[]}
 */
export function resource_get_text() {
    return resource_get_text__()
}

/**
 * Object [ koorie.resource.get_video ]
 * returns a collection of video file extensions.
 *
 * @returns {string[]}
 */
export function resource_get_video() {
    return resource_get_video__()
}

/**
 * Object [ koorie.resource.set_public]
 * returns the path of the public file from requests.
 *
 * @param {string} path - register the resource public from the request.
 * @returns {unknown}
 */
export function resource_set_public( path = '' ) {
    return resource_set_public__( path )
}

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
 * Object [ koorie.routes.set.check ]
 * type check of the exports from the route module.
 *
 * @param {Function|AsyncFunction} route_exports - route exports
 */
export async function routes_set_check( route_exports ) {
    return routes_set_check__( route_exports )
}

/**
 * Object [ koorie.routing.all ]
 * elaborates the ServerResponse with the injected catch-all route.
 *
 * @param {Function|AsyncFunction} RouteExport - catch all route
 * @param {IncomingMessage} Incoming - incoming
 * @param {ServerResponse} Outgoing - outgoing
 * @returns {Promise<{Object}>|Object}
 */
export async function routing_all( RouteExport, Incoming, Outgoing ) {
    return routing_all__( RouteExport, Incoming, Outgoing )
}

/**
 * Object [ koorie.routing.file ]
 * elaborates the ServerResponse based on the requested file.
 *
 * @param {string} filename - filename of the requested resource
 * @param {Readable} readable - readable
 * @param {ServerResponse} Outgoing - outgoing
 * @returns {Promise<{Object}>|Object}
 */
export async function routing_file( filename, readable, Outgoing ) {
    return routing_file__( filename, readable, Outgoing )
}

/**
 * Object [ koorie.routing.route ]
 * elaborates the ServerResponse based on the requested route.
 *
 * @param {IncomingMessage} Incoming - incoming
 * @param {ServerResponse} Outgoing - outgoing
 * @returns {Promise<{Object}>|Object}
 */
export async function routing_route( Incoming, Outgoing ) {
    return routing_route__( Incoming, Outgoing )
}

/**
 * Object [ koorie.routing ]
 * sends back @ Object [ koorie.dispatcher ] the ServerResponse data.
 *
 * @param {IncomingMessage} Incoming - incoming
 * @param {ServerResponse} Outgoing - outgoing
 * @returns {Promise<Buffer|undefined>| Buffer|undefined}
 */
export async function routing( Incoming, Outgoing ){
    return routing__( Incoming, Outgoing )
}

/**
 * Resolvers for oftypes undefined_ function.
 *
 * @param {KoorieServerArgumentProperties} flags - Parsed arguments.
 * @returns {Promise<{false: ((function(): Promise<void>)|*), true: ((function(): Promise<void>)|*)}>}
 */
export async function server_resolvers( flags ){
    return server_resolvers__( flags )
}

/**
 * Object [ koorie.server].
 *
 * @param { KoorieServerArgumentProperties } flags - Parsed arguments.
 * @returns {Promise<void>}
 */
export async function server( flags ){
    return server__( flags )
}

/**
 * Object [ koorie.socket ]
 * Socket server connection to koorie PrimaryProcess.
 *
 * @param {{path:string}} options - path from th the --socket flag
 * @returns {Promise<void> |void }
 */
export async function socket( options ){
    return socket__( options )
}

/**
 * System check while forking the processes.
 * NUMBER of CPUs must be greater or equal to the given argument to the flag --cluster.
 *
 * @param {*=} check - given flag.
 * @returns {AsyncGenerator<*>}
 */
export async function cluster_system_check( check ){
    return cluster_system_check__( check )
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
 *
 * @returns {{unknown: string, [p: string]: NodeJS.MemoryUsage}}
 */
export function memory(){
    return memory__()
}

/**
 * Get the host_os information - system.
 *
 * @returns {{arch: string, platform: NodeJS.Platform}}
 */
export function host_os() {
    return host_os__()
}

/**
 * Get the os_uptime statistic for system.
 *
 * @returns {string}
 */
export function os_uptime() {
    return os_uptime__()
}

/**
 * Object [ koorie.api ]
 *
 * @private
 */

/**
 * Object [ koorie.socket.api.hot ]
 * it can set/unset, through socket, **hot wired**.
 *
 * @param {Socket} socket - socket client/server.
 * @param {string} switch_on - hot options :)
 * @returns {Promise<void>|void}
 */
export async function api_hot( socket, switch_on ) {
    return api_hot__( socket, switch_on )
}

/**
 * Object [ koorie.socket.api.memory ]
 * it streams, through socket, the MemoryUsage of the Primary Process
 * It doesn't take in account the Workers in **forked state**.
 *
 * @param {Socket} socket - client/server.
 * @returns {Promise<{[unknown]:string, [p:string]:NodeJS.MemoryUsage}> | {unknown: string, [p: string]: NodeJS.MemoryUsage}}
 */
export async function api_memory ( socket ) {
    return api_memory__( socket )
}

/**
 * Object [ shell.init ]
 *
 * The options aren't required.
 *
 * @param {{git:boolean=,middleware:string=,name:string=,description:string=,version:string=,author:string=,license:string=, bare:false=}=} options - flags passed to the command init.
 * @returns {Promise<void>}
 */
export async function init( options ){
    return init__( options )
}

/**
 * Object [ shell.set ]
 * Through socket connection to koorie,
 * koorie-shell can set/unset options without restarting the server
 * this is because most of the options are ENVIRONMENT_VARIABLES.
 *
 * @param {{hot:string, socket_path:string}} options - on the fly options to set/unset
 * @returns {Promise<void> | void}
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

const require = createRequire( import.meta.url )
export const { version } = require( './package.json' )
