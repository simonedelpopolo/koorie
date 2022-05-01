import * as tttt from 'trythistrythat'
import { ejected } from '../../../../index.js'

/**
 * Module filename - /Volumes/code/koorie/tests/koorie/server/function.ejected.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

    tttt.describe( '# the ejected function transform the object argument into process.argv' )
    tttt.describe( '# entry_point does the type check and gives back again the object.' )
    await tttt.separator( 240, 75, '~' )
    await tttt.line()

    console.log( await ejected( {
        static_files: 'public',
        port: 3023,
        health: undefined
    } ) )

    tttt.end_test( id )
}
