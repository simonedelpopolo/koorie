import { initialize } from '../../initialize.js'
import { resource } from '../../../../index.js'
import { set_publicEvent } from '../../resource.js'

/**
 *
 */
export async function undefined_resolver(){
    set_publicEvent.on( 'set', async answer => {
        if ( answer === true ) {
            process.env.STATIC_FILES = await resource.get_public()
            await initialize()
        }
        
    } )
    await resource.set_public( '' )
}
