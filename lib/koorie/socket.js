import { Blaze } from '@cli-blaze/decors'
import cluster from 'node:cluster'
import { createServer } from 'node:net'
import { parse } from 'json-swiss-knife'
import { api_hot, api_memory } from '../../private.js'

/**
 * Object [ koorie.socket ]
 * Socket server connection to koorie PrimaryProcess.
 *
 * @param {{path:string}} options - path from th the --socket flag
 * @returns {Promise<void> |void }
 */
export default async function socket( options ) {

    const socket_shell = createServer( socket => {

        socket.write( Blaze.color( 247, '\nreceiving\n' ) )
        socket.on( 'end', () => {
            socket.write( Blaze.color( 247, '\nclosed\n' ) )
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
                        // - console.trace( options )
                        break
                }
            }

        } )


    } )

    socket_shell.on( 'error', error => console.error( error ) )

    socket_shell.listen( { path:options.path }, async () => {
        if( !cluster.isWorker ) {
            console.log()
            console.log( Blaze.strong( Blaze.bg_color( 253, Blaze.color( 63, `⌖ socket active at -> ${ process.env.SOCKET_PATH }⌖ ` ) ) ) )
            console.log()
        }
    } )

}
