// eslint-disable-next-line no-unused-vars
import * as index from '../../index.js'
import * as tttt from 'trythistrythat'
import { koorie } from '../../lib/exports.js'

/**
 * Exports in module /Volumes/code/koorie/tests/koorie/koorie.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

    tttt.describe( '# module koorie overview' )
    await tttt.separator( 240, 75, '~' )
    await tttt.line()

    console.dir( koorie, { depth:null } )

    tttt.end_test( id )
}
