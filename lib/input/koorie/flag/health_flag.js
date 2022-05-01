import { only_void, promise } from '../../../../private.js'

/**
 * Object [ input.health_flag ]
 *
 * - --health type check.
 *
 * @param {string} options - the value from the shell.
 * @throws { Error }
 * @returns {Promise<Error|undefined>|Error|undefined}
 */
export default async function health_flag( options ){

    let flag = await only_void( options, true )

    return promise( flag )
}
