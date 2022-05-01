import { Blaze } from '@cli-blaze/decors'
import cluster from 'node:cluster'
import { constants } from 'fs'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { koorie_log_writer } from './logger/functions/fork_koorie_log_writer.js'
import { listen_text } from './initialize/text/listen.js'
import { true_false } from 'boolean-jokes'
import { access, rm } from 'node:fs/promises'
import { array_, oftype_ } from 'oftypes'
import { cluster_system_check, socket } from '../../private.js'

/**
 * Object [ koorie.fork ]
 * Handles the cluster and forks.
 *
 * @param {number|string|boolean} cpus - Parsed arguments. If is set 0 it will use all the available CPUs.
 * @param {{path:string, flag:string}} static_files - Static files absolute path (directory `public`).
 * @param {string} ejected - file to bootstrap koorie ejected state.
 * @returns {Promise<void> | void}
 */
export default async function fork( cpus, static_files, ejected ){

    process.env.FALSE_FLAG = 'true'
    if( await oftype_( ejected ) !== 'undefined' )
        process.env.EJECTED_FILE = ejected

    let forks_for_cpus
    let executable_like_file

    /**
     * - ./lib/koorie/fork/cluster_system_check
     * explanatory comments there.
     *
     * @type {AsyncGenerator}
     */
    const cluster_system_checking = await cluster_system_check( cpus )

    /**
     * - first check
     * - second check
     * - third check
     * - forth check
     * ./lib/koorie/fork/cluster_system_check
     * explanatory comments there.
     *
     * @type {number|PromiseRejectionEvent}
     */
    forks_for_cpus = await cluster_system_checking.next()
        .then( resolve => resolve.value )
        .catch( console.error )

    /**
     * - last check is for the file that will execute to start up the server
     * ./lib/koorie/fork/cluster_system_check
     * explanatory comments there.
     */
    const executable_like_file_system_check = await cluster_system_checking.next( )
        .then( resolved => resolved.value )
        .catch( async error => exit(
            Blaze.bg_red( Blaze.color( 255, error.message ) ),
            new ReferenceError( `${process.title} Object [koorie.cluster] initialize file not ${error.cluster} -> ${error.initialize_file}` ),
            error_code.FLAG
        ) )

    // - set async function generator to done.
    executable_like_file = await cluster_system_checking.return( executable_like_file_system_check )
        .then( fork => fork.value )
        .catch( console.error )

    if ( cluster.isPrimary ) {

        cluster.setupPrimary( {
            args: process.argv,
            exec: executable_like_file,
            stdio: [ 'inherit', 'inherit', 'inherit', 'ipc' ]
        } )

        console.log( Blaze.green( '----------------------------------------------------' ) )
        console.log( Blaze.underline( Blaze.strong( Blaze.bg_yellow( Blaze.green( `${process.title} @ pid->${process.pid} up and rocking` ) ) ) ) )

        const socket_active = await true_false( process.env.SOCKET_ACTIVE )
        const socket_path = process.env.SOCKET_PATH

        if( socket_active ) {

            // Checks if the socket file already exists if exists will be deleted.
            const socket_file = await access( process.env.SOCKET_PATH, constants.F_OK ).catch( error => error )
            if( ! ( socket_file instanceof Error ) ) {
                await rm( process.env.SOCKET_PATH ).catch( async error => {
                    await exit(
                        '[ koorie.fork] error-deletion',
                        new ReferenceError( error.message ),
                        error_code.INTERNAL
                    )
                } )
            }

            await socket( { path: socket_path } )
        }

        // - one time server.listen() message
        console.log( listen_text() )
        console.log( Blaze.green( '----------------------------------------------------' ) )

        // Fork workers.
        for ( let i = 0; i < forks_for_cpus; i++ ) {
            cluster.fork( {
                STATIC_FILES: process.env.STATIC_FILES,
                EXPERIMENTAL_LOG_WRITER_PID: process.env.EXPEXPERIMENTAL_LOG_WRITER_PID,
                FORKED: process.env.FORKED,
                HOT: process.env.HOT
            } )
        }

        cluster.on( 'exit', ( worker, code, signal ) => {

            console.info( `worker ID -> ${worker.id} died with code [${code}] received signal ${signal}` )

            // - it forks with actual Primary Process ENVIRONMENT_VARIABLE
            cluster.fork( {
                STATIC_FILES: process.env.STATIC_FILES,
                EXPERIMENTAL_LOG_WRITER_PID: process.env.EXPEXPERIMENTAL_LOG_WRITER_PID,
                FORKED: process.env.FORKED,
                HOT: process.env.HOT
            } )
        } )

        // - emptying process.argv this will ensure that the killed and resurrected processes wil not have the same argv
        cluster.on( 'fork', () => process.argv.splice( 0, process.argv.length + 1 ) )

        // - todo reorganization of the socket APIs
        // - todo all the cluster.isPrimary.event.message moved into another Object.
        // - todo all the cluster.isWorker.event.message moved into another Object.
        cluster.on( 'message', async ( worker, options ) => {

            // - the worker message sent to primary koorie process that will process the data @ koorie_log_writer
            if( await array_( options ) )
                koorie_log_writer.send( options[ 0 ] )

        } )
    }
}
