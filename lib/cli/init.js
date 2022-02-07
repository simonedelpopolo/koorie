/* eslint-disable capitalized-comments */
import cli from '../cli.js'
import { parse } from 'json-swiss-knife'
import { spawn } from 'child_process'
import { string_ } from 'oftypes'
import { access, mkdir, readFile, writeFile } from 'fs/promises'

export const initSymbol = Symbol( 'koorie-cli initialization script' )
export const init = Object.defineProperty( cli, initSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Initialization script. An object from a json string passed to the terminal.
     * The arguments it is not required.
     *
     * @param {{name:string=,description:string=,version:string=}=} options - The json parsed options.
     * @returns {Promise<void>}
     * @example npx koorie init='{"name":"my-app", "description":"my frivolous app"}'
     */
    value : async function init( options ){
    
        const working_dir = process.cwd()
        await mkdir( `${working_dir}/routes/index`, { recursive:true } ).catch( error => {throw error} )
        
        await writeFile( `${working_dir}/index.js`, index, { flag: 'w' } ).catch( error => {throw error} )
        await writeFile( `${working_dir}/middleware.js`, middleware, { flag: 'w' } ).catch( error => {throw error} )
        await writeFile( `${working_dir}/routes/index/route.js`, indexRoute, { flag: 'w' } ).catch( error => {throw error} )
    
        const node_modules = await access( `${working_dir}/node_modules` ).catch( error => error.message )
        if( await string_( node_modules ) ) {
            const install = spawn( 'npm', [
                'install',
                '--silent',
                'koorie',
            ], {
                stdio: [
                    'ignore',
                    process.stdout,
                    process.stderr,
                ],
            } )
            install.on( 'exit', async code => {
                if( code !== 0 ) {
                    process.stdout.write( 'something went wrong with npm.' )
                    process.exit( 1 )
                }
                
                await writePackageJson()
            } )
        }else
            await writePackageJson()
        
        
        /**
         *
         */
        async function writePackageJson (){
    
            let package_json
            const pkg_json = await access( `${working_dir}/package.json` ).catch( error => error.message )
    
            if( await string_( pkg_json ) ) {
                package_json = {}
                await writeFile( `${ working_dir }/package.json`, JSON.stringify( package_json ), { flag: 'w' } ).catch( error => {throw error} )
            }
            else
                package_json = await parse( await readFile( `${working_dir}/package.json` ).catch( error => {throw error} ) )
    
            package_json[ 'dependencies' ].koorie = 'latest'
            package_json.scripts = { serve: 'npx koorie' }
            package_json.type = 'module'
    
            await writeFile( `${working_dir}/package.json`, JSON.stringify( package_json ), { flag: 'w' } ).catch( error => {throw error} )
    
            process.stdout.write( 'koorie init pack generated' )
            process.exit( 0 )
        }
    }
} )


const index = Buffer.from( `#!/usr/bin/env node
( await import( \`\${ process.cwd() }/middleware.js\` ) ).default()
import { flags, server } from 'koorie'

// Splicing out from \`process.argv\` the paths for node and index.js
process.argv.splice( 0, 2 )

// Process name.
process.title = 'koorie'

await server( await flags( process.argv ) )
` )

const middleware = Buffer.from( `import { routes } from 'koorie'

export default async () => {
    routes.list.push( { route:'', asyncFunction: ( await import( './routes/index/route.js' ) ).index  } )
    await routes.set()
}
` )

const indexRoute = Buffer.from( `/**
 * Route - index.
 *
 * @returns {PromiseFulfilledResult<Buffer>}
 */
export async function index(  ){
    
    return new Promise( resolve => {
        
        resolve( Buffer.from( JSON.stringify( { 'index-route': 'response' } ) ) )
        
    } )
}
` )


