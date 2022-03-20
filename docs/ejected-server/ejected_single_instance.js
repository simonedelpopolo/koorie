import { ejected, server } from 'koorie'

/**
 * - this will run a single instance of the server.
 * - type ⇩ just for information on the options that can be set.
 *
 * @type {{cluster: number, static_files: string, port: number, ejected: string, logger: {quiet: boolean}, socket: {path: string, active: boolean}, hot: boolean, secure: {dhparam: string, active: boolean, cert: string, key: string}}}
 */
const options = {
    static_files: 'public',
    port: 3000
};

/**
 * we import the default middleware function using closure
 */
( await import( `${ process.cwd() }/middleware.js` ) ).default()

/**
 * the ejected function transform the object first into string[]
 * it will be given @[ input.processor ] for the type checking routine
 * finally it will be given @[ koorie.server ] a parsed and kool object.
 */
await server( await ejected( options ) )
