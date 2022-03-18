import { EventEmitter } from 'node:events'
import { map } from 'boolean-jokes'
import readline from 'node:readline'

export const bare_flag_events = new EventEmitter()
/**
 * Questioning --bare flag.
 */
export async function bare(){
    const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdout
    } )

    rl.question( `--bare flag intercepted. this will overwrite everything in this directory -> ${process.cwd().magenta()}, sure? [yes|no]\n`.red(), async ( answer ) => {
        const confirmation = await map( { yes: true, y:true, no: false, n: false }, answer ).catch( error => error )
        switch ( confirmation ){
            case false:
                readline.moveCursor( process.stdout, 0, -1 )
                console.log( 'aborted'.green() )
                process.exit( 0 )

                break
            case true:
                readline.moveCursor( process.stdout, 0, -1 )
                console.warn( 'proceeding...'.yellow() )
                bare_flag_events.emit( 'choice', true )
                rl.close()
                break
            default:
                break
        }
    } )
}

