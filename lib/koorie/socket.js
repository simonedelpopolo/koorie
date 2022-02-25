import cluster from 'node:cluster'
import { createServer } from 'node:net'
import koorie from '../koorie.js'

export const socketSymbol = Symbol( 'Object [ koorie.socket ] koorie-shell socket commutator' )
export const socket = Object.defineProperty( koorie, socketSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Socket connection to koorie.
     *
     * @param {{path:string}} options - socket options.
     * @returns {Promise<void>}
     */
    value: async function socket( options ) {
    
        const socket_shell = createServer( socket => {
        
            // 'connection' listener.
            console.log( 'oK' )
            socket.on( 'end', () => {
                console.log( 'done' )
            } )
        
            
            socket.on( 'data', buffer => {
                
                if( !cluster.isWorker )
                    process.env.HOT = buffer.toString()
                else if( cluster.isWorker ) {
                    process.env.HOT = buffer.toString()
                    process.send( { hot: buffer.toString() } )
                }
                
                
            } )
        
            socket.pipe( socket )
        } )
    
        socket_shell.on( 'error', ( err ) => {
            throw err
        } )
    
        socket_shell.listen( { path:options.path }, () => {
            console.trace( socket_shell.address() )
        } )
        
    }
} )
