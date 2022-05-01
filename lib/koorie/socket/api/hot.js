import { Blaze } from '@cli-blaze/decors'
import cluster from 'node:cluster'

/**
 * Object [ koorie.socket.api.hot ]
 * it can set/unset, through socket, **hot wired**.
 *
 * @param {Socket} socket - socket client/server.
 * @param {string} switch_on - hot options :)
 * @returns {Promise<void>|void}
 */
export default async function api_hot( socket, switch_on ) {

    process.env.HOT = switch_on

    for ( const worker in cluster.workers  )
        cluster.workers[ worker ].send( switch_on )

    let work = Blaze.green( 'single || workers' )
    work += Blaze.red( ' ➠ ' )
    work += `pid = [${Blaze.cyan( process.pid.toString() )}]`
    work += Blaze.green( ' received new option for **hot state**' )

    socket.write( `${work}${Blaze.magenta( '\nthe options will be applied without reloading the server || workers. ⬇︎' )}\n` )
    socket.write( `${Blaze.green( JSON.stringify( switch_on ) )}` )
}
