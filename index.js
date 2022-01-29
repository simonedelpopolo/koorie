import  { flags as flags_ } from './lib/flags/exporter.js'
import {
    cluster__,
    logger__,
    routing__,
    server as s,
    status200,
    status404,
} from './lib/koorie/exporter.js'

import { routes as rts } from './lib/koorie/server.js'

export const routes = rts

/**
 * Argument Parser.
 *
 * @param {string[]} args - Given arguments from terminal.
 * @returns {Promise<unknown>}
 */
export async function flags( args ){
    return flags_( args )
}

export const code200 = status200
export const code404 = status404

/**
 * Handles the server log.
 *
 * @param {{quiet:boolean, write:{disk:boolean, filename:string}=,info:any[]}} options - Infos.
 * @returns {*}
 */
export function logger( options ){
    return logger__( options )
}

/**
 * Handles the cluster and forks.
 *
 * @param {{cpus:number,init:string}|number} options - Parsed arguments.
 * @returns {Promise<void>}
 */
export function cluster_( options ) {
    return cluster__( options )
}

/**
 * Handles the response of the index.html.
 *
 * @returns {Promise<void>}
 */
export function routing( ){
    return routing__()
}

/**
 * Lightweight server for react-dang app.
 *
 * @param {{p:string,port:string,a:string,address:string,c:string,cluster:string|object,s:string,'static-files':string}|null} flags - Parsed arguments.
 * @returns {Promise<void>}
 */
export function server( flags ){
    return s( flags )
}
