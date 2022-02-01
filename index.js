import  { arguments__, process_exit_, stderr_ } from './lib/flags/exporter.js'
import {
    dispatcher__,
    fork__,
    logger__,
    routes__,
    routing__,
    server__,
} from './lib/koorie/exporter.js'

export const routes = routes__
export const process_exit = process_exit_

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
 * @returns {Promise<void>}
 */
export async function fork( options ) {
    return fork__( options )
}

/**
 * Dispatcher.
 *
 * @param {object} parameters - .
 * @returns {Promise<*>}
 */
export async function dispatcher( parameters ){
    return dispatcher__( parameters )
}

/**
 *  Routing.
 *
 * @param {{buffer:Buffer, log:object}|Error} response - .
 * @param {IncomingMessage=} incoming - .
 * @param {ServerResponse=} outgoing - .
 * @returns {Promise<void>}
 */
export async function routing( response, incoming, outgoing ){
    return routing__( response, incoming, outgoing )
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
