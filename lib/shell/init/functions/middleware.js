/**
 * Object [shell.init] code for middleware file.
 *
 * @returns {Buffer}
 */
export function middleware(){
    return `import { routes } from 'koorie'

export default async () => {
    routes.list.push( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index  } )
    await routes.set()
}`.toBuffer()
}
