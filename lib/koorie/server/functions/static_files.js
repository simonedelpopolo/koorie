import { default as resource_event_static_files } from '../../resource/event/static_files.js'
import { resolvers, undefined_ } from 'oftypes'
import { resource_get_public, resource_set_public } from '../../../../private.js'

/**
 * Sets the `public` directory.
 *
 * @param {string} flag - --static-files flag
 */
export async function static_files( flag ){

    const truthy = async () => {
        // Because koorie.resource.set_public is set to an empty string is awaiting the answer
        resource_event_static_files.on( 'set', async answer => {
            if ( answer === true ) {
                process.env.STATIC_FILES = resource_get_public()
                resource_event_static_files.emit( 'done' )
            }
        } )
        await resource_set_public( '' )
    }

    const falsy = async () => {
        resource_event_static_files.on( 'set', async answer => {

            if ( answer === true ) {
                process.env.STATIC_FILES = resource_get_public()
                resource_event_static_files.emit( 'done' )
            }
        } )
        await resource_set_public( flag )
    }
    await ( await undefined_( flag, await resolvers( truthy, falsy ) ) )()
}
