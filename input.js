import {
    address_flag__,
    response_time_flag__
} from './lib/exporter.js'

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
