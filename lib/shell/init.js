/* eslint-disable capitalized-comments,jsdoc/require-jsdoc */
import { parse } from 'json-swiss-knife'
import shell from '../shell.js'
import { spawn } from 'child_process'
import { string_ } from 'oftypes'
import { access, mkdir, readFile, writeFile } from 'fs/promises'

export const initSymbol = Symbol( 'koorie-shell initialization script' )
export const init = Object.defineProperty( shell, initSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * The options aren't required.
     *
     * @param {{middleware:string=,name:string=,description:string=,version:string=,author:string=,license:string=}=} options - flags passed to the command init.
     * @returns {Promise<void>}
     */
    value : async function init( options ){
        
        console.trace( 'shell.init', options )
        
        const middleware_option = options.middleware ? options.middleware: 'middleware.js'
        
        const working_dir = process.cwd()
        await mkdir( `${working_dir}/routes/index`, { recursive:true } ).catch( error => {throw error} )
        
        await writeFile( `${working_dir}/${middleware_option}`, middleware, { flag: 'w' } ).catch( error => {throw error} )
        await writeFile( `${working_dir}/routes/index/route.js`, indexRoute, { flag: 'w' } ).catch( error => {throw error} )
    
        const node_modules = await access( `${working_dir}/node_modules/koorie` ).catch( error => error.message )
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
        
        async function writePackageJson (){
    
            let package_json
            const pkg_json = await access( `${working_dir}/package.json` ).catch( error => error.message )
    
            if( await string_( pkg_json ) ) {
                package_json = {}
                await writeFile( `${ working_dir }/package.json`, JSON.stringify( package_json ), { flag: 'w' } ).catch( error => {throw error} )
            }
            else
                package_json = await parse( await readFile( `${working_dir}/package.json` ).catch( error => {throw error} ) )
    
            package_json[ 'name' ] = options.name ? options.name : 'a name'
            package_json[ 'description' ] = options.description ?  options.description : 'a description'
            package_json[ 'version' ] = options.version ?  options.version : '0.0.1'
            package_json[ 'author' ] = options.author ?  options.author : 'an author'
            package_json[ 'license' ] = options.license ?  options.license : 'Apache-2.0'
            package_json[ 'dependencies' ].koorie = 'latest'
            package_json.scripts = { serve: options.middleware ? `npx koorie --middleware=${options.middleware}` : 'npx koorie' }
            package_json.type = 'module'
    
            await writeFile( `${working_dir}/package.json`, JSON.stringify( package_json ), { flag: 'w' } ).catch( error => {throw error} )
    
            
        }
        process.stdout.write( await readFile( `${working_dir}/package.json` ) + '\n' )
        
        process.stdout.write( 'koorie init pack generated' )
    }
} )

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


