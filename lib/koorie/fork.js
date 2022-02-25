import cluster from 'node:cluster'
import { cluster_flag_run } from '../exporter.js'
import koorie from '../koorie.js'
import { true_false } from 'boolean-jokes'
import { process_exit, resource, shell_exit_codes } from '../../index.js'

export const forkSymbol = Symbol( 'function that initializes the cluster and forks' )
export const fork = Object.defineProperty( koorie, forkSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,
    
    /**
     * Handles the cluster and forks.
     *
     * @param {number|string|boolean} cpus - Parsed arguments. If is set 0 it will use all the available CPUs.
     * @param {{path:string, flag:string}} static_files - Static files absolute path (directory `public`).
     * @returns {Promise<void>}
     */
    value: async function cluster_( cpus, static_files ){
        
        // Default set to fork the initialize file.
        let initializeFile = `${process.cwd()}/koorie.js`
        
        /**
         * - todo to be simplified.
         *
         * @type {AsyncGenerator}
         */
        const cluster_run = await cluster_flag_run( cpus )
        
        // Default sets to the half of the available CPUs on the system
        let clusterCPUs = await cluster_run.next()
            
            .then( resolve => resolve.value )
            
            .catch( async error => process_exit( 'clusterCPUs data type error.', error, shell_exit_codes.flags ) )
    
        await cluster_run.next()
            
            .then( async number_cpus_check => {
                await number_cpus_check.value( clusterCPUs )
                    .catch( async error => process_exit(
                        'cluster number of CPUs requested can\'t be satisfied',
                        error,
                        shell_exit_codes.flags
                    ) )
            } )
    
        await cluster_run.next()
            .then( async initialize_file_exists => {
                await initialize_file_exists.value( initializeFile )
                    .catch( async error => process_exit(
                        error.message,
                        Error( `${process.title} Object [koorie.cluster] initialize file not found -> ${initializeFile}` ),
                        shell_exit_codes.flags
                    ) )
            } )
    
        await cluster_run.next()
        
        process.argv.push( '--false-flag=true' )
        
        let static_files_path = static_files.path.length === 0 ? 'ForkEmptyPathY' : static_files.path
        static_files.flag === false ? process.argv.push( `--static-files=${static_files_path}` ) : null
        
        cluster.setupPrimary( {
            args: process.argv,
            exec: initializeFile,
            stdio: [ 'inherit', 'inherit', 'inherit', 'ipc' ]
        } )
        
        if ( cluster.isPrimary ) {
            console.log( `Primary ${process.pid} is running` )
            
            if( await true_false( process.env.SOCKET_ACTIVE ) ) {
                console.log()
                console.log( `⌖ socket active at -> ${ process.env.SOCKET_PATH }⌖ `.color( 63 ).bg_color( 253 ).strong() )
                console.log()
            }
            
            // Fork workers.
            for ( let i = 0; i < clusterCPUs; i++ )
                cluster.fork( )
    
            let resurrection
            cluster.on( 'exit', ( worker ) => {
                
                console.log( `worker ${ worker.process.pid } died` )
                
                // - todo cluster worker env handler
                cluster.fork( resurrection.options )
                
            } )
        
            let worker
            cluster.on( 'fork', worker_ => {
                worker = `_koorie-worker-id:${worker_.id}(process.pid -> ${worker_.process.pid})`
                console.log( worker )
            } )
            
            for ( const id in cluster.workers )
                cluster.workers[ id ].on( 'message', () => {} )
            
            cluster.on( 'message', async ( worker, options ) => {
                
                // - todo workers resurrection
                resurrection = options
                
                // - emptying process.argv during killing time.
                process.argv.splice( 0, process.argv.length + 1 )
                
                // - repopulating it with basic default flags, because most of the options that are on the fly can be set from process.env
                process.argv.push( '--false-flag=true' )
                process.argv.push( `--static-files=${await resource.get_path()}` )
                
                let work = 'cluster worker'.green()
                work += ' ➠ '.red()
                work += `id = [${worker.id.toString().cyan()}]`
                work += ' received new set of options'.green()
                
                worker.send( `${work}` )
                worker.send( '\nthe options will be applied to all the workers ⬇︎ \n'.magenta() )
                worker.send( `${JSON.stringify( options )}\n`.green() )
                
                for ( const worker of Object.values( cluster.workers ) )
                    process.nextTick( () => worker.destroy() )
                
            } )
        }
        
    }
} )
