/**
 * Object [shell.init] code for route index.
 *
 * @returns {Buffer}
 */
export function route(){
    return Buffer.from( `import { Answer } from 'koorie'

export async function index(){
    return new Answer( good => good( Buffer.from( JSON.stringify( { 'index-route': 'response' } ) ) ) )
}
` )
}
