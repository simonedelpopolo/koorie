import * as assert from 'node:assert'
/**
 * - import everything from public.js to mock imports and exports.
 */
// eslint-disable-next-line no-unused-vars
import * as mock from '../../../../public.js'
import * as tttt from 'trythistrythat'
import { ejected_flag } from '../../../../input.js'

/**
 * Module filename - /Volumes/code/koorie/tests/koorie/server/function.ejected.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

    tttt.describe( '# --ejected type check' )
    tttt.describe( '# --ejected accept only string' )
    await tttt.separator( 240, 75, '~' )
    await tttt.line()

    let error = await tttt.oki( async () => {
        await tttt.line()

        return {
            expected: undefined,
            actual: await ejected_flag( undefined )
        }
    } )

    tttt.describe( 'it returns undefined' )

    if( error instanceof Error ){
        tttt.failed( true )
        console.error( error )
    }else
        tttt.describe( '##  test passed'.green() )

    error = await tttt.oki( async () => {
        await tttt.line()

        const type = await ejected_flag( 'ejected-state.js' )

        return {
            expected: 'ejected-state.js',
            actual: type
        }
    } )

    tttt.describe( 'it returns the given filename' )

    if( error instanceof Error ){
        tttt.failed( true )
        console.error( error )
    }else
        tttt.describe( '##  test passed'.green() )

    await tttt.line()
    tttt.describe( 'it rejects with OftypesError' )
    try{
        await assert.rejects(
            async () => {
                throw await ejected_flag( '3' )
            },
            ( error ) => {

                assert.strictEqual( error.name, 'OftypesError' )

                tttt.describe( error.message )

                return true
            } )

        tttt.describe( '##  test passed'.green() )

    }catch ( AssertionError ) {

        tttt.failed( true )
        tttt.describe( '\n', AssertionError )
    }

    tttt.end_test( id )
}
