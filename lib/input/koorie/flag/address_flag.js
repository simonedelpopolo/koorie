import { only_string, promise } from '../../../../private.js'

/**
 * Object [ input.address_flag ]
 *
 * - --address type check.
 *
 * @param {string} options - check
 * @throws { Error }
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export default async function address_flag( options ){

    const flag = await only_string( options, undefined )

    return promise( flag )
}
