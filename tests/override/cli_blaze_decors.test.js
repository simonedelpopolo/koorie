import * as tttt from 'trythistrythat'
import { override } from '@cli-blaze/decors'

/**
 * Module filename - /Volumes/code/koorie/tests/override/cli_blaze_decors.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

    await override()
    tttt.describe( '# Shows all the functions that extends Buffer & String prototype' )
    await tttt.separator( 240, 75, '~' )
    await tttt.line()

    tttt.describe( '# String.prototype' )
    tttt.describe( String.prototype )
    await tttt.separator( 240, 75, '~' )
    await tttt.line()

    tttt.describe( '# Buffer.prototype' )
    tttt.describe( Buffer.prototype )
    await tttt.separator( 240, 75, '~' )
    await tttt.line()

    tttt.end_test( id )
}
