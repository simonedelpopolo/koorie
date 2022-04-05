import { Answer } from '../../public.js'

/**
 * Route - All.
 *
 * @returns {Promise<{buffer:Buffer}> | {buffer:Buffer}}
 */
export async function all(){
    return new Answer( good => good( JSON.stringify( { 'all-route' : 'response' } ).toBuffer() ) )
}
