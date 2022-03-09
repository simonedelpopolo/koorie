import cluster from 'node:cluster'
import { createServer } from 'node:net'
import koorie from '../koorie.js'
import { api_hot, api_memory } from '../../index.js'
import { is_json, parse } from 'json-swiss-knife'

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
                socket.write( 'closed\n'.color( 247 ) )
            } )

            socket.on( 'data', async buffer => {

                if( !await is_json( buffer.toString() ) )
                    socket.write( 'no correct data received. options were not ⇩\n'.red() )
                else{
                    /**
                     *
                     * @type {{refresh_rate:number}|Object<{HOT:string}>}
                     */
                    let opts = await parse( buffer.toString() )

                    const optsKeys = Object.keys( opts )

                    for ( const option in optsKeys ){

                        // eslint-disable-next-line default-case
                        switch( optsKeys[ option ] ){


                            case 'performance': {


                                const memory = setInterval(
                                    async () => {

                                        await api_memory( socket )

                                    }, opts.refresh_rate )


                                socket.on( 'end', () => clearInterval( memory ) )
                            }
                                break

                            case 'HOT':

                                await api_hot( socket, opts )

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
