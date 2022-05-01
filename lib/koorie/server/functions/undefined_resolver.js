import { initialize } from '../../initialize.js'
import { default as resource_event_static_files } from '../../resource/event/static_files.js'
import { resource_get_public, resource_set_public } from '../../../../private.js'

/**
 * When null is passed to server function.
 *
 * @returns {Promise<void>}
 */
export async function undefined_resolver(){
    resource_event_static_files.on( 'set', async answer => {
        if ( answer === true ) {
            process.env.STATIC_FILES = resource_get_public()
            await initialize()
        }

    } )
    await resource_set_public( '' )
}
