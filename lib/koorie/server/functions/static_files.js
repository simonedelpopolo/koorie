import { resource } from '../../../../index.js'
import { set_publicEvent } from '../../resource.js'
import { undefined_ } from 'oftypes'

/**
 * Sets the `public` directory.
 *
 * @param {string} flag - --static-files[-s] flag
 */
export async function static_files( flag ){

    await ( await undefined_( flag, {
        true:( async () => {

            await resource.set_public( '' ).then( () => {

                // Because koorie.resource.set_public is set to an empty string is awaiting the answer
                set_publicEvent.on( 'set', async answer => {
                    if ( answer === true ) {
                        process.env.STATIC_FILES = await resource.get_public()
                        set_publicEvent.emit( 'done', { flag: false, path: await resource.get_path() } )
                    }
                } )

            } )
        } ),
        false: ( async () => {
            set_publicEvent.on( 'set', async answer => {

                if ( answer === true ) {
                    process.env.STATIC_FILES = await resource.get_public()
                    set_publicEvent.emit( 'done', { flag: true, path: await resource.get_path() } )
                }
            } )
            await resource.set_public( flag )
        } )
    } ) )()
}
