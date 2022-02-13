import cluster from 'cluster'
import { cluster_flag_run } from '../arguments/exporter.js'
import koorie from '../koorie.js'
import { koorieErrors, process_exit } from '../../index.js'

export const forkSymbol = Symbol( 'function that initializes the cluster and forks' )
export const fork = Object.defineProperty( koorie, forkSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,
    
    /**
     * Handles the cluster and forks.
     *
     * @param {number} cpus - Parsed arguments. If is set 0 it will use all the available CPUs.
     * @param {string} static_files - Static files absolute path (directory `public`).
     * @returns {Promise<void>}
     */
    value: async function cluster_( cpus, static_files ){
        
        // Default set to fork the initialize file.
        let initializeFile = `${process.cwd()}/koorie.js`
    
        /**
         * @type {AsyncGenerator}
         */
        const cluster_run = await cluster_flag_run( cpus )
        
        // Default sets to the half of the available CPUs on the system
        let clusterCPUs = await cluster_run.next()
            
            .then( resolve => resolve.value )
            
            .catch( async error => process_exit( 'clusterCPUs data type error.', error, koorieErrors.flags ) )
    
        await cluster_run.next()
            
            .then( async number_cpus_check => {
                await number_cpus_check.value( clusterCPUs )
                    .catch( async error => process_exit(
                        'cluster number of CPUs requested can\'t be satisfied',
                        error,
                        koorieErrors.flags
                    ) )
            } )
    
        await cluster_run.next()
            .then( async initialize_file_exists => {
                await initialize_file_exists.value( initializeFile )
                    .catch( async error => process_exit(
                        error,
                        Error( 'Koorie-Error-InitializeFile' ),
                        koorieErrors.flags
                    ) )
            } )
    
        process.argv.push( '--false-flag=true' )
        let static_files_path = static_files.path.length === 0 ? 'ForkEmptyPathY' : static_files.path
        static_files.flag === false ? process.argv.push( `--static-files=${static_files_path}` ) : null
        
        cluster.setupPrimary( {
            args: process.argv,
            exec: initializeFile,
        } )
    
        if ( cluster.isPrimary ) {
            console.log( `Primary ${process.pid} is running` )
        
            // Fork workers.
            for ( let i = 0; i < clusterCPUs; i++ )
                cluster.fork()
        
            cluster.on( 'exit', ( worker ) => {
                console.log( `worker ${worker.process.pid} died` )
            } )
        
            let worker
            cluster.on( 'fork', worker_ => {
                worker = `_rd-app-worker-id:${worker_.id}`
                console.log( worker )
            } )
        
            cluster.on( 'message', ( worker, message ) => console.log( message ) )
        }
    }
} )
