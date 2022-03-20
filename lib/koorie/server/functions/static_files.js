import { default as resource_event_static_files } from '../../resource/event/static_files.js'
import { undefined_ } from 'oftypes'
import { resource_get_public, resource_set_public } from '../../../../index.js'

/**
 * Sets the `public` directory.
 *
 * @param {string} flag - --static-files[-s] flag
 */
export async function static_files( flag ){

    await ( await undefined_( flag, {
        true:( async () => {

            await resource_set_public( '' ).then( () => {

                // Because koorie.resource.set_public is set to an empty string is awaiting the answer
                resource_event_static_files.on( 'set', async answer => {
                    if ( answer === true ) {
                        process.env.STATIC_FILES = resource_get_public()
                        resource_event_static_files.emit( 'done', { flag: false, path: resource_get_public() } )
                    }
                } )

            } ).catch( error => console.trace( error ) )
        } ),
        false: ( async () => {
            resource_event_static_files.on( 'set', async answer => {

                if ( answer === true ) {
                    process.env.STATIC_FILES = resource_get_public()
                    resource_event_static_files.emit( 'done', { flag: true, path: resource_get_public() } )
                }
            } )
            await resource_set_public( flag )
        } )
    } ) )()
}
