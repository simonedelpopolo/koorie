import { only_void, promise } from '../../../../private.js'

/**
 * Object [ input.experimental_log_writer_flag ]
 *
 * - --experimental_log_writer type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<Error|undefined>|Error|undefined}
 */
export default async function experimental_log_writer_flag( options ){

    let flag = await only_void( options, true )

    return promise( flag )
}
