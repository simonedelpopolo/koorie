import { Answer } from '../../public.js'

/**
 * Route - Index.
 *
 * @returns {Promise<{buffer:Buffer}> | {buffer:Buffer}}
 */
export async function index( ){
    return new Answer( good => good( JSON.stringify( { 'index-route' : 'response' } ).toBuffer() ) )
}
