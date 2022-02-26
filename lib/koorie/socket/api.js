import cluster from 'node:cluster'
import { memory } from './functions/memory.js'
import { socket, socketSymbol } from '../socket.js'

export const apiSymbol = Symbol( 'Object [ socket.api ] exposed for koorie' )
export const  api = Object.defineProperty( socket[ socketSymbol ], apiSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    value: {
        memory: async( socket_, refresh_rate = 1_000 ) => {
        
            socket_.write( JSON.stringify( await memory( refresh_rate ) ) )
        },
        /**
         * Hot option.
         *
         * @param {Socket} socket_ - .
         * @param {{[p:string]:any}} opts - .
         * @returns {Promise<void>}
         */
        hot: async( socket_, opts ) => {
            
            if( !cluster.isWorker ) {
                process.env.HOT = opts.HOT
        
                let work = 'single instance'.green()
                work += ' ➠ '.red()
                work += `pid = [${process.pid.toString().cyan()}]`
                work += ' received new set of options'.green()
        
                socket_.write( `${work}${'\nthe options will be applied without reloading the server ⬇︎'.magenta()}\n` )
                socket_.write( `${JSON.stringify( opts )}`.green() )
            }
    
            else if( cluster.isWorker ) {
                process.env.HOT = opts.HOT
                process.send( { options: { HOT: opts.HOT } } )
            }
        }
    },
} )
