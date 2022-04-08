import * as public_module from '../public.js'
import * as tttt from 'trythistrythat'

/**
 * Exports in module /Volumes/code/koorie/tests/public.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

    tttt.describe( '# it shows all the public exports in module ./public.js' )
    await tttt.separator( 240, 75, '~' )
    await tttt.line()

    console.dir( public_module, { depth:null } )

    tttt.end_test( id )
}
