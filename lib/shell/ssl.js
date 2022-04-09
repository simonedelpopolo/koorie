import { constants } from 'fs'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import shell from '../shell.js'
import { spawn } from 'node:child_process'
import { access, mkdir } from 'node:fs/promises'

const sslSymbol = Symbol( 'Object [ shell.ssl ]' )
const ssl = Object.defineProperty( shell, sslSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Generate self-signed certificate with OpenSSL.
     * ❗️OpenSSL must be available on host OS.
     *
     * @param {{path:string|boolean,key:string|boolean,cert:string|boolean,dhparam:string|boolean}} options - self-signed certificate options.
     * @returns {Promise<void>}
     */
    value: async function ssl( options ) {

        if( options.path !== false ) {
            const path = await access( options.path.toString(), constants.F_OK ).catch( error => error )
            if ( path instanceof Error )
                // - if permission on files aren't OK it will throw
                await mkdir( options.path.toString() ).catch( error => {throw error} )
        }

        /**
         * Check if openssl is available in host OS.
         *
         * @type {ChildProcessWithoutNullStreams}
         */
        const spawn_openssl_available = spawn( 'type', [ '-p', 'openssl' ] )
        spawn_openssl_available.on( 'exit', async code => {
            if ( code !== 0 )
                await exit( 'openssl not available on host OS'.bg_blue().color( 255 ), new ReferenceError( '[koorie.ssl - OS-error]' ), error_code.COMMAND )

            const spawn_certificate = spawn( 'openssl', [
                'req',
                '-x509',
                '-newkey',
                'rsa:4096',
                '-keyout',
                `${options.path || '.'}/${options.key || 'key.pem'}`,
                '-out',
                `${options.path || '.'}/${options.cert || 'cert.pem'}`,
                '-sha256',
                '-days',
                365,
                '-nodes',
                '-subj',
                '/CN=localhost'
            ], {
                stdio:[ 'ignore', process.stdout, process.stderr ]
            } )

            spawn_certificate.on( 'exit', async code => {
                if( code !== 0 )
                    await exit( `certificate-error ->process exited with code: ${code}, check openssl manual`.bg_blue().color( 255 ), new ReferenceError( '[koorie.ssl - unknown-error]' ), error_code.COMMAND )

                if( options.dhparam !== false ) {
                    const spawn_dhparam = spawn( 'openssl', [
                        'dhparam',
                        '-out',
                        `${options.path || '.'}/${ options.dhparam || 'dhparam.pem' }`,
                        2048,
                    ], {
                        stdio: [
                            'ignore',
                            process.stdout,
                            process.stderr,
                        ],
                    } )

                    spawn_dhparam.on( 'exit', async code => {
                        if( code !== 0 )
                            await exit( `dhparam-error -> process exited with code: ${code}, check openssl manual`.bg_blue().color( 255 ), new ReferenceError( '[koorie.ssl - unknown-error]' ), error_code.COMMAND )

                        console.log()
                        console.log( '  files generated:'.color( 255 ).bg_green() )
                        console.log( `   @key ${options.path || '.'}/${options.key || 'key.pem'}`.blue() )
                        console.log( `   @cert ${options.path || '.'}/${options.cert || 'cert.pem'}`.blue() )
                        console.log( `   @dhparam ${options.path || '.'}/${options.dhparam || 'dhparam.pem'}`.blue() )
                        console.log()
                    } )
                }else{
                    console.log()
                    console.log( '  files generated:'.color( 255 ).bg_green() )
                    console.log( `   @key ${options.path || '.'}/${options.key || 'key.pem'}`.blue() )
                    console.log( `   @cert ${options.path || '.'}/${options.cert || 'cert.pem'}`.blue() )
                    console.log()
                }
            } )
        } )

    }
} )

export default ssl[ sslSymbol ]
