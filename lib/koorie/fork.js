import { access } from 'fs/promises'
import cluster from 'cluster'
import { constants } from 'fs'
import { cpus } from 'os'
import koorie from '../koorie.js'
import { process_exit } from '../../whisk.js'
import { number_, object_, undefined_ } from 'oftypes'

export const forkSymbol = Symbol( 'function that initializes the cluster and forks' )
export const fork = Object.defineProperty( koorie, forkSymbol, {
    enumerable:true,
    writable: false,
    configurable: false,
    
    /**
     * Handles the cluster and forks.
     *
     * @param {{cpus:number,init:string}|number} options - Parsed arguments.
     * @param static_files
     * @returns {Promise<void>}
     */
    value: async function cluster_( options, static_files ){
        
        // Default sets to the half of the available CPUs on the system
        let clusterCPUs
    
        // Default set to fork the initialize file.
        let initializeFile = `${process.cwd()}/index.js`
        
        if( cpus().length > 1 )
            clusterCPUs = cpus().length / 2
        else
            clusterCPUs = 1
    
        if( await number_( options ) === true )
            clusterCPUs = options
        
        if( await object_( options ) === true ) {
            clusterCPUs = await undefined_( options.cpus ) === true ? clusterCPUs : options.cpus
            initializeFile = ( await undefined_( options.init ) === true || options.init === 'default' ) ? initializeFile : options.init
        }
    
        {if( clusterCPUs > cpus().length ){
            await process_exit(
                'cluster number of CPUs requested can\'t be satisfied',
                Error( 'rd-app-CPUs-Exceed' ),
                6
            )
        }}
        
        await access(
            initializeFile,
            constants.F_OK
        ).catch( async error => {
            await process_exit(
                error.message,
                Error( 'rd-app-InitializeFile' ),
                7
            )
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