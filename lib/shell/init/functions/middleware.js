/**
 * Object [shell.init] code for middleware file.
 *
 * @returns {Buffer}
 */
export function middleware(){
    return `import { Answer, routes_inject, routes_set } from 'koorie'

export default async () => {
    await routes_inject( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index, incoming: ''  } )
    await routes_set()
}`.toBuffer()
}
