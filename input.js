import {
    address_flag__,
    cluster_flag__,
    hot_flag__,
    koorie_process__,
    response_time_flag__,
    shell_process__,
    socket_flag__
} from './lib/exporter.js'

/**
 * Koorie process.
 *
 * @param {object} process_parsed_argv - process.argv parsed.
 * @returns {Promise<Object<any>>}
 */
export async function koorie_process( process_parsed_argv ) {
    return koorie_process__( process_parsed_argv )
}

/**
 * Koorie-shell process.
 *
 * @param {object} process_parsed_argv - process.argv parsed.
 * @returns {Promise<Object<any>>}
 */
export async function shell_process( process_parsed_argv ) {
    return shell_process__( process_parsed_argv )
}

/**
 * Object [ input.response_time_flag.get ].
 *
 * - response_time_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function response_time_flag( options ){
    return response_time_flag__( options )
}

/**
 * Object [ input.address_flag ].
 *
 * - address_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function address_flag( options ){
    return address_flag__( options )
}

/**
 * Object [ input.cluster_flag ].
 *
 * - cluster_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function cluster_flag( options ){
    return cluster_flag__( options )
}

/**
 * Object [ input.hot_flag ].
 *
 * - hot_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function hot_flag( options ){
    return hot_flag__( options )
}

/**
 * Object [ input.socket_flag ].
 *
 * - socket_flag type check.
 *
 * @param {string} option - the value from the shell.
 * @throws { Error }
 * @returns {Promise<{socket:socket}|Error|undefined>|{socket:socket}|Error|undefined}
 */
export async function socket_flag( option ){
    return socket_flag__( option )
}
