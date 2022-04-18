import { resolvers, undefined_ } from 'oftypes'

/**
 * If the flag ejected is not undefined set the ENVIRONMENT_VARIABLE:
 * - EJECTED
 * - EJECTED_FILE
 *
 * @param {string} flag - The --ejected value.
 * @returns {Promise<undefined|string>|undefined|string}
 */
export async function ejected( flag ){

    const truthy = () => undefined

    const falsy = () => {
        process.env.EJECTED = 'true'
        process.env.EJECTED_FILE = flag

        return flag
    }

    return ( await undefined_( flag, await resolvers( truthy, falsy ) ) )()
}
