import * as tttt from 'trythistrythat'
import { ejected } from '../../../../lib/koorie/server/functions/ejected.js'

/**
 * Module filename - /Volumes/code/koorie/tests/koorie/server/function.ejected.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

    tttt.describe( '# --ejected goes SET' )
    await tttt.separator( 240, 75, '~' )
    await tttt.line()

    const filename = 'ejected-state.js'
    const returned_filename = await ejected( filename )

    let error = await tttt.oki( async () => {
        await tttt.line()

        return {
            expected: filename,
            actual: returned_filename
        }
    } )

    tttt.describe( 'it returns the given filename' )

    if( error instanceof Error ){
        tttt.failed( true )
        console.error( error )
    }else
        tttt.describe( '##  test passed'.green() )

    error = await tttt.oki( async () => {
        await tttt.line()

        return {
            expected: 'true',
            actual: process.env.EJECTED
        }
    } )

    tttt.describe( 'it sets process.env.EJECTED to \'true\'' )

    if( error instanceof Error ){
        tttt.failed( true )
        console.error( error )
    }else
        tttt.describe( '##  test passed'.green() )

    error = await tttt.oki( async () => {
        await tttt.line()

        return {
            expected: filename,
            actual: process.env.EJECTED_FILE
        }
    } )

    tttt.describe( 'it sets process.env.EJECTED_FILENAME to the given filename' )

    if( error instanceof Error ){
        tttt.failed( true )
        console.error( error )
    }else
        tttt.describe( '##  test passed'.green() )

    error = await tttt.oki( async () => {
        await tttt.line()

        return {
            expected: undefined,
            actual: await ejected( undefined )
        }
    } )

    tttt.describe( 'it returns undefined' )

    if( error instanceof Error ){
        tttt.failed( true )
        console.error( error )
    }else
        tttt.describe( '##  test passed'.green() )

    tttt.end_test( id )
}
