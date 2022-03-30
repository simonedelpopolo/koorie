import cluster from 'node:cluster'
import { createServer } from 'node:net'
import koorie from '../koorie.js'
import { parse } from 'json-swiss-knife'
import { api_hot, api_memory } from '../../index.js'

const socketSymbol = Symbol( 'Object [ koorie.socket ]' )
const socket = Object.defineProperty( koorie, socketSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.socket ]
     * Socket server connection to koorie PrimaryProcess.
     *
     * @param {{path:string}} options - path from th the --socket flag
     * @returns {Promise<void> |void }
     */
    value: async function socket( options ) {

        const socket_shell = createServer( socket => {

            socket.write( '\nreceiving\n'.color( 247 ) )
            socket.on( 'end', () => {
                socket.write( '\nclosed\n'.color( 247 ) )
            } )

            socket.on( 'data', async buffer => {

                /**
                 * @type {Object<{refresh_rate:number}|{hot:string}>}
                 */
                let options = await parse( buffer )

                const optionsKeys = Object.keys( options )

                for ( const option in optionsKeys ){

                    switch( optionsKeys[ option ] ){

                        case 'performance': {

                            const memory = setInterval(
                                async () => {

                                    await api_memory( socket )

                                }, options.refresh_rate )

                            socket.on( 'end', () => clearInterval( memory ) )
                        }
                            break

                        case 'hot':

                            await api_hot( socket, options.hot )

                            break
                        default:
                            // - just for debug
                            console.trace( options )
                            break
                    }
                }

            } )


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

export default socket[ socketSymbol ]
