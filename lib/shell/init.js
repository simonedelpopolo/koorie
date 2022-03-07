import { middleware } from './init/functions/middleware.js'
import { random_properties } from './init/functions/random_properties.js'
import { route } from './init/functions/route.js'
import shell from '../shell.js'
import { spawn } from 'node:child_process'
import { bare, Bare__ } from './init/functions/bare.js'
import { is_json, parse } from 'json-swiss-knife'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { process_exit, shell_exit_codes } from '../../index.js'

export const initSymbol = Symbol( 'Object [ shell.init ] basic server project' )
export const init = Object.defineProperty( shell, initSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * The options aren't required.
     *
     * @param {{middleware:string=,name:string=,description:string=,version:string=,author:string=,license:string=, bare:false=}=} options - flags passed to the command init.
     * @returns {Promise<void>}
     */
    value : async function init( options ){
        
        // - todo type checking for options parameter.
        
        const middleware_option = options.middleware || 'middleware.js'
        
        Bare__.on( 'choice', async answer => {
        
            if( answer === true ) await generating()
        
        } )
        
        if( options.bare === true )
            await bare()
        else
            await generating()
    
        /**
         * Initialize a basic server project.
         *
         * @returns {Promise<void>}
         */
        async function generating(){
            /**
             * - generating random project directory
             * - use flag --bare to use the current directory as project root directory. this will overwrite your package.json if any.
             *
             * @type {string}
             */
            let dir = options.bare === true ? '' : `/${await random_properties( 'cwd' )}`
    
            const working_dir = `${ process.cwd() }${dir}`
    
            if( options.bare === false ) {
                /**
                 * - making project directory.
                 * - use flag --bare to use the current directory as project root directory. this will overwrite your package.json if any.
                 */
                await mkdir( working_dir ).catch( async error => {
                    await process_exit( error.message, new Error( 'Object [shell.init] mkdir `working_dir`' ), shell_exit_codes.commands )
                } )
            }
    
            /**
             * - making directory for routes.
             */
            await mkdir( `${working_dir}/routes/index`, { recursive:true } ).catch( async error => {
                await process_exit( error.message, new Error( 'Object [shell.init] mkdir `working_dir/routes/index`' ), shell_exit_codes.commands )
            } )
    
            /**
             * - writing middleware file.
             */
            await writeFile( `${working_dir}/${middleware_option}`, middleware(), { flag: 'w' } ).catch( async error => {
                await process_exit( error.message, new Error( 'Object [shell.init] writeFile `working_dir/middleware`' ), shell_exit_codes.commands )
            } )
    
            /**
             * - writing index route ./routes/index/route.js.
             */
            await writeFile( `${working_dir}/routes/index/route.js`, route(), { flag: 'w' } ).catch( async error => {
                await process_exit( error.message, new Error( 'Object [shell.init] writeFile `working_dir/routes/index/route.js`' ), shell_exit_codes.commands )
            } )
    
            let package_json = {}
    
            package_json[ 'name' ] = options.name || await random_properties( 'name' )
            package_json[ 'description' ] = options.description || await random_properties( 'description' )
            package_json[ 'version' ] = options.version || '0.0.1'
            package_json[ 'author' ] = options.author || await random_properties( 'author' )
            package_json[ 'license' ] = options.license || 'Apache-2.0'
            package_json.scripts = { serve: options.middleware ? `npx koorie --middleware=${options.middleware}` : 'npx koorie' }
            package_json.type = 'module'
    
            await writeFile( `${working_dir}/package.json`, JSON.stringify( package_json ), { flag: 'w' } ).catch( async error => {
                await process_exit( error.message, new Error( 'Object [shell.init] writeFile `working_dir/package.json`' ), shell_exit_codes.internal )
            } )
    
            const install = spawn( 'npm', [
                'install',
                'koorie',
                '--silent',
            ], {
                cwd: `${ process.cwd() }/${dir}`,
                stdio: [
                    'ignore',
                    process.stdout,
                    process.stderr,
                ],
            } )
    
            install.on( 'error', async error => {
                await process_exit( error.message, new Error( 'Object [shell.init] spawn `error event`' ), shell_exit_codes.internal )
            } )
    
            install.on( 'exit', async code => {
                if( code !== 0 )
                    await process_exit( `${'something went wrong with npm.'.red()} \n exit code ->${code}`, new Error( 'Object [shell.init] spawn `exit event error`' ), shell_exit_codes.internal )
        
                const package_json = await readFile( `${working_dir}/package.json` ).catch( async error => {
                    await process_exit( error.message, new Error( 'Object [shell.init] readFile `package.json`' ), shell_exit_codes.internal )
                } )
        
                await is_json( package_json, true ).catch( async error => {
                    await process_exit( error, new Error( 'Object [shell.init] is_json `error package.json not json`' ), shell_exit_codes.internal )
                } )
        
                console.info( await parse( package_json ) )
                console.info( 'koorie init pack generated'.green() )
                console.info( `cd ${working_dir}`.magenta().bg_green() )
                console.info( 'npm run serve'.magenta().bg_green() )
            } )
        }
        
    }
} )
