import { fork } from '../../../../index.js'
import { initialize } from '../../initialize.js'
import { boolean_, number_, resolvers, string_, undefined_ } from 'oftypes'

/**
 * Spins up the cluster.
 *
 * @param {number|string} flag - --cluster[-c] flag.
 * @param {undefined|string} false_flag - --false-flag to spin the workers without the --cluster flag inherit from the Primary
 * @param {string | undefined=} ejected - the file to be loaded when ejected state.
 */
export async function cluster( flag, false_flag, ejected ){

    /**
     * Resolver true
     * When there is no --cluster flag run a single instance server.
     *
     * @returns {Promise<void>|void}
     */
    const truthy = async () => {
        if ( await undefined_( false_flag ) )
            await initialize()
    }

    /**
     * Resolver false.
     *
     * @returns {Promise<void>|void}
     */
    const falsy = async () => {
        // If the false flags is undefined run koorie.fork()
        if ( await undefined_( false_flag ) ){

            if( await number_( flag ) === true ){

                if(  flag !== 0 )

                    await fork( flag, ejected )

                else

                    await fork( 0, ejected )

            }else if ( await boolean_( flag ) === true )

                await fork( true, ejected )

            else if( await string_( flag ) === true ) {

                if( flag.toString() === 'full' )

                    await fork( 'full', ejected )
            }

        }
    }

    await ( await undefined_( flag, await resolvers( truthy, falsy ) ) )()
}
