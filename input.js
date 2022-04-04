import {
    address_flag__,
    cluster_flag__,
    ejected_flag__,
    experimental_log_writer_flag__,
    health_flag__,
    hot_flag__,
    init_author_flag__,
    init_bare_flag__,
    init_command__,
    init_description_flag__,
    init_git_flag__,
    init_license_flag__,
    init_middleware_flag__,
    init_name_flag__,
    init_version_flag__,
    koorie_process__,
    library_flag__,
    logger_flag__,
    middleware_flag__,
    response_time_flag__,
    secure_flag__,
    shell_process__,
    silenced_flag__,
    socket_flag__,
    static_files_flag__,
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
 * Object [ input.health_flag ].
 *
 * - health_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function health_flag( options ){
    return health_flag__( options )
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
 * Object [ input.initializer_flag ].
 *
 * - initializer_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function ejected_flag( options ){
    return ejected_flag__( options )
}

/**
 * Object [ input.experimental_log_writer_flag ].
 *
 * - experimental_log_writer_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<Error|undefined>|Error|undefined}
 */
export async function experimental_log_writer_flag( options ){
    return experimental_log_writer_flag__( options )
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
 * Object [ input.silenced_flag ].
 *
 * - --silenced flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<Error|undefined>|Error|undefined}
 */
export async function silenced_flag( options ){
    return silenced_flag__( options )
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

/**
 * Object [ input.init_middleware_flag ].
 *
 * - --middleware flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<Error|undefined>|Error|undefined}
 */
export async function init_middleware_flag( options ){
    return init_middleware_flag__( options )
}

/**
 * Object [ input.init_bare_flag ].
 *
 * - --bare flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<Error|undefined>|Error|undefined}
 */
export async function init_bare_flag( options ){
    return init_bare_flag__( options )
}

/**
 * Object [ input.init_git_flag ].
 *
 * - --git flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<Error|undefined>|Error|undefined}
 */
export async function init_git_flag( options ){
    return init_git_flag__( options )
}

/**
 * Object [ input.init_version_flag ].
 *
 * - version_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function init_version_flag( options ){
    return init_version_flag__( options )
}

/**
 * Object [ input.init_author_flag ].
 *
 * - author_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function init_author_flag( options ){
    return init_author_flag__( options )
}

/**
 * Object [ input.init_description_flag ].
 *
 * - description_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function init_description_flag( options ){
    return init_description_flag__( options )
}

/**
 * Object [ input.init_license_flag ].
 *
 * - license_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function init_license_flag( options ){
    return init_license_flag__( options )
}

/**
 * Object [ input.init_name_flag ].
 *
 * - name_flag type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export async function init_name_flag( options ){
    return init_name_flag__( options )
}
