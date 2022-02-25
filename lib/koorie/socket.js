import cluster from 'node:cluster'
import { createServer } from 'node:net'
import koorie from '../koorie.js'
import { is_json, parse } from 'json-swiss-knife'
import { true_false } from 'boolean-jokes'

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
        
            socket.write( '\nreceiving\n'.color( 247 ) )
            socket.on( 'end', () => {
                socket.write( 'applied\n'.color( 247 ) )
            } )
            
            socket.on( 'data', async buffer => {
                
                if( !await is_json( buffer.toString() ) )
                    socket.write( 'no correct data received. options were not ⇩\n'.red() )
                else{
                    let opts = await parse( buffer.toString() )
    
                    const optsKeys = Object.keys( opts )
    
                    for ( const option in optsKeys ){
                        
                        // eslint-disable-next-line default-case
                        switch( optsKeys[ option ] ){
                            case 'HOT':
                
                                if( !cluster.isWorker ) {
                                    process.env.HOT = opts.HOT
    
                                    let work = 'single instance'.green()
                                    work += ' ➠ '.red()
                                    work += `pid = [${process.pid.toString().cyan()}]`
                                    work += ' received new set of options'.green()
    
                                    socket.write( `${work}` )
                                    socket.write( '\nthe options will be applied without reloading the server ⬇︎ \n'.magenta() )
                                    socket.write( `${JSON.stringify( opts )}\n`.green() )
                                }
                
                                else if( cluster.isWorker ) {
                                    process.env.HOT = opts.HOT
                                    process.send( { options: { HOT: opts.HOT } } )
                                }
                                break
                        }
                    }
                }
                
                
            } )
        
            if( cluster.isWorker ) {
                cluster.worker.on( 'message', message => {
                    socket.write( message )
                } )
            }
        } )
        
        socket_shell.on( 'error', error => console.error( error ) )
    
        socket_shell.listen( { path:options.path }, async () => {
            if( !cluster.isWorker ) {
                console.log()
                console.log( `⌖ socket active at -> ${ process.env.SOCKET_PATH }⌖ `.color( 63 ).bg_color( 253 ).strong() )
                console.log()
            }
        } )
        
    }
} )
