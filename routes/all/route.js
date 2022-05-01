import { Answer } from '../../index.js'

/**
 * Route - All.
 *
 * @returns {Promise<{buffer:Buffer}> | {buffer:Buffer}}
 */
export async function all(){
    return new Answer( good => good( Buffer.from( JSON.stringify( { 'all-route' : 'response' } ) ) ) )
}
