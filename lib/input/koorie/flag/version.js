import { OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * - --version[-v] type check
 *
 * @param {string} arg - value
 * @yields
 * @returns {AsyncGenerator<OftypesError|boolean, void, OftypesError|boolean>}
 */
export async function * koorie_version_flag( arg ){

    const truthy = () => true
    const falsy = () => new OftypesError( '--version doesn\'t accept any argument' )
    yield await ( await undefined_( arg, await resolvers( truthy, falsy ) ) )()

}
