import { only_string, promise } from '../../../../private.js'

/**
 * Object [ input.ejected_flag ]
 *
 * - --ejected type check.
 *
 * @param {any} options - check
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export default async function ejected_flag( options ){

    const flag = await only_string( options, undefined )

    return promise( flag )
}
