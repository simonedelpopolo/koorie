import * as index_module from '../private.js'
import * as tttt from 'trythistrythat'

/**
 * Exports in module /Volumes/code/koorie/tests/index.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

    tttt.describe( '# it shows all the private exports in module ./private.js' )
    await tttt.separator( 240, 75, '~' )
    await tttt.line()

    console.dir( index_module, { depth:null } )
    tttt.end_test( id )
}
