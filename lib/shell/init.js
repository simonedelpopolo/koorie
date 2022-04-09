import { constants } from 'node:fs'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { finished_text } from './init/text/finished.js'
import { middleware } from './init/functions/middleware.js'
import { random_properties } from './init/functions/random_properties.js'
import { route } from './init/functions/route.js'
import shell from '../shell.js'
import { spawn } from 'node:child_process'
import { access, mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { bare, bare_flag_events } from './init/functions/bare.js'
import { is_json, parse } from 'json-swiss-knife'

const initSymbol = Symbol( 'Object [ shell.init ]' )
const init = Object.defineProperty( shell, initSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ shell.init ]
     *
     * The options aren't required.
     *
     * @param {{git:boolean=,middleware:string=,name:string=,description:string=,version:string=,author:string=,license:string=, bare:false=}=} options - flags passed to the command init.
     * @returns {Promise<void>}
     */
    value : async function init( options ){

        let rename_back_package_json = false
        let rename_back_node_modules = false

        if( options.bare === false ){
            const package_json_exists = await access( './package.json', constants.F_OK ).catch( error => error )

            if( !( package_json_exists instanceof Error ) ) {
                await rename( './package.json', './_package.json' )
                    .catch( error => exit( error.message, Error( 'Object [react-dang.install] rename package.json' ), error_code.INTERNAL ) )
                rename_back_package_json = true
            }

            const node_modules_exists = await access( './node_modules', constants.F_OK ).catch( error => error )

            if( !( node_modules_exists instanceof Error ) ) {
                await rename( './node_modules', './_node_modules' )
                    .catch( error => exit( error.message, Error( 'Object [react-dang.install] rename node_modules' ), error_code.INTERNAL ) )
                rename_back_node_modules = true
            }
        }

        const middleware_option = options.middleware || 'middleware.js'

        bare_flag_events.on( 'choice', async answer => {

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
                    await exit( error.message, new Error( 'Object [shell.init] mkdir `working_dir`' ), error_code.COMMAND )
                } )
            }

            /**
             * - making directory for routes.
             */
            await mkdir( `${working_dir}/routes/index`, { recursive:true } ).catch( async error => {
                await exit( error.message, new Error( 'Object [shell.init] mkdir `working_dir/routes/index`' ), error_code.COMMAND )
            } )

            /**
             * - writing middleware file.
             */
            await writeFile( `${working_dir}/${middleware_option}`, middleware(), { flag: 'w' } ).catch( async error => {
                await exit( error.message, new Error( 'Object [shell.init] writeFile `working_dir/middleware`' ), error_code.COMMAND )
            } )

            /**
             * - writing index route ./routes/index/route.js.
             */
            await writeFile( `${working_dir}/routes/index/route.js`, route(), { flag: 'w' } ).catch( async error => {
                await exit( error.message, new Error( 'Object [shell.init] writeFile `working_dir/routes/index/route.js`' ), error_code.COMMAND )
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
                await exit( error.message, new Error( 'Object [shell.init] writeFile `working_dir/package.json`' ), error_code.INTERNAL )
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
                await exit( error.message, new Error( 'Object [shell.init] spawn `error event`' ), error_code.INTERNAL )
            } )

            install.on( 'exit', async code => {
                if( code !== 0 )
                    await exit( `${'something went wrong with npm.'.red()} \n exit code ->${code}`, new Error( 'Object [shell.init] spawn `exit event error`' ), error_code.INTERNAL )

                const package_json = await readFile( `${working_dir}/package.json` ).catch( async error => {
                    await exit( error.message, new Error( 'Object [shell.init] readFile `package.json`' ), error_code.INTERNAL )
                } )

                await is_json( package_json, true ).catch( async error => {
                    await exit( error, new Error( 'Object [shell.init] is_json `error package.json not json`' ), error_code.INTERNAL )
                } )

                if( options.git ) {
                    const spawn_git_available = spawn( 'type', [
                        '-p',
                        'git',
                    ] )
                    spawn_git_available.on( 'exit', async code => {
                        if ( code !== 0 ) {
                            console.warn( 'git not available on host OS'.bg_blue()
                                .color( 255 ), new ReferenceError( 'Object [react-dang.install] not-satisfied-error' ), error_code.COMMAND )
                        }else{

                            const git = spawn( 'git', [
                                'init',
                            ], {
                                cwd: working_dir,
                                stdio: [
                                    'ignore',
                                    process.stdout,
                                    process.stderr,
                                ],
                            } )

                            git.on( 'exit', async code => {
                                if( code !== 0 ) {
                                    console.warn( `git exited with code ➡ ${code}`.bg_blue()
                                        .color( 255 ), new ReferenceError( 'Object [react-dang.install] not-satisfied-error' ), error_code.COMMAND )
                                }else
                                    console.log( 'git init successful\r'.green() )

                                console.log( finished_text( options.bare, options.git, await parse( package_json ), working_dir ) )

                                if( options.bare === false ) {
                                    if ( rename_back_package_json ) {
                                        await rename( './_package.json', './package.json' )
                                            .catch( error => exit( error.message, Error( 'Object [react-dang.install] rename package.json' ), error_code.INTERNAL ) )
                                    }

                                    if ( rename_back_node_modules ) {
                                        await rename( './_node_modules', './node_modules' )
                                            .catch( error => exit( error.message, Error( 'Object [react-dang.install]  rename node_modules' ), error_code.INTERNAL ) )
                                    }
                                }
                            } )
                        }
                    } )
                }
            } )
        }

    }
} )

export default init[ initSymbol ]
