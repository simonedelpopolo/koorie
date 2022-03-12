import {
    address_flag__,
    cluster_flag__,
    hot_flag__,
    init_command__,
    koorie_process__,
    library_flag__,
    logger_flag__,
    middleware_flag__,
    response_time_flag__,
    secure_flag__,
    shell_process__,
    socket_flag__,
    static_files_flag__
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
 * Koorie flags.
 */
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

/**
 * Object [ input.secure_flag ].
 *
 * - secure_flag type check.
 *
 * @param {string} option - the value from the shell.
 * @throws { Error }
 * @returns {Promise<{socket:{}}|Error|undefined>|{socket:{}}|Error|undefined}
 */
export async function secure_flag( option ){
    return secure_flag__( option )
}

/**
 * Object [ input.library_flag ].
 *
 * - library_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function library_flag( options ){
    return library_flag__( options )
}

/**
 * Object [ input.logger_flag ].
 *
 * - logger_flag type check.
 *
 * @param {string} option - the value from the shell.
 * @throws { Error }
 * @returns {Promise<{logger:{write:string|null, quiet:boolean}, error:any}|Error|undefined>|{logger:{write:string|null, quiet:boolean, error:any}}|Error|undefined}
 */
export async function logger_flag( option ){
    return logger_flag__( option )
}

/**
 * Object [ input.middleware_flag ].
 *
 * - middleware flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function middleware_flag( options ){
    return middleware_flag__( options )
}

/**
 * Object [ input.static_files_flag ].
 *
 * - static-files flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function static_files_flag( options ){
    return static_files_flag__( options )
}

/**
 * Koorie-shell commands and flags.
 */
/**
 * The koorie-shell init command doesn't accept any options.
 *
 * @param {any} options - if any options is given just exits.
 * @returns {Promise<Error|undefined>| Error|undefined}
 */
export async function init_command( options ){
    return init_command__( options )
}
