import { ejected, server } from 'koorie'

/**
 * - ❗when **forked state** & **ejected state** some options are required
 *
 *   - 'ejected' is a required parameter or flag.
 *   - 'cluster' is a required parameter.
 *
 *   - when **forked state** & **hot wired**
 *     ❗it is required to set the 'hot' : typeof process.env.EJECTED === 'undefined' ? true : process.env.HOT
 *
 *   - the flag [ ejected=ejected_clustered_instances.js ] is required only when it is **koorie interface** to load in **ejected state** the server.
 *   - in this example we will use node to load the server in **ejected state**
 *
 * @type {{cluster: number, static_files: string, port: number, ejected: string, logger: {quiet: boolean}, socket: {path: string, active: boolean}, hot: boolean, secure: {dhparam: string, active: boolean, cert: string, key: string}}}
 */
const options = {
    static_files: 'public',
    port: 3001,
    // - ❗required when clustering because in case of workers death, they are got back to work with the same ENVIRONMENT_VARIABLES.
    hot: typeof process.env.EJECTED === 'undefined' ? true : process.env.HOT,
    /**
     * ❗when clustering in **ejected state** 'ejected' is a required option.
     * it is required and important because the file to be loaded in phase of forking must be the same as this one
     * if not specified the DEFAULT file will be loaded to fork the workers breaking the things up
     * **default file ./node_modules/koorie/koorie.js**
     */
    ejected: 'ejected_clustered_instances.js',
    cluster: undefined // this will fork processes for the half of the available CPUs same as --cluster flag without any argument{void}
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
