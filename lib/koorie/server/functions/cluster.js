import { fork } from '../../../../index.js'
import { initialize } from '../../initialize.js'
import { boolean_, number_, string_, undefined_ } from 'oftypes'

/**
 * Spins up the cluster.
 *
 * @param {number|string} flag - --cluster[-c] flag.
 * @param {undefined|boolean} false_flag - --false-flag to spin the workers without the --cluster-flag inherit from the Primary
 * @param {{path: string, flag: string}} static_files - `public` directory
 */
export async function cluster( flag, false_flag, static_files ){

    await ( await undefined_( flag, {
        true: ( async() => {
            if ( await undefined_( false_flag ) === true )
                await initialize()
        } ),
        false: ( async () => {
            // If the false flags is undefined run koorie.fork()
            if ( await undefined_( false_flag ) === true ){

                if( await number_( flag ) === true ){

                    if(  flag !== 0 )

                        await fork( flag, static_files )

                    else

                        await fork( 0, static_files )

                }else if ( await boolean_( flag ) === true )

                    await fork( true, static_files )

                else if( await string_( flag ) === true ) {

                    if( flag.toString() === 'full' )

                        await fork( 'full', static_files )
                }

            }
        } )
    } ) )()
}
