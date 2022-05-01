import * as tttt from 'trythistrythat'
import { Blaze } from '@cli-blaze/decors'
import { default as static_files_flag } from '../lib/input/koorie/flag/static_files_flag.js'

/**
 * Exports in module static_files_flag.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

    tttt.describe( Blaze.underline( Blaze.strong( '# UNIT test for the static_files_flag type checking' ) ) )

    const reject_number_type = await tttt.oki( async () => {

        tttt.describe( Blaze.yellow( '##  -1' ), Blaze.color( 33, ' given a number value to --static-files=3 will exit with code 2' ) )

        return {
            expected: `${ Blaze.green( 'given option -> ' ) }'${Blaze.red( '3' )}' - ${ process.title } flags-error`,
            actual : await static_files_flag( 3 ).catch( error => error.message ),
            error: '## the expected result mismatched'
        }
    } )

    if( reject_number_type instanceof Error ) {
        tttt.failed( true )
        tttt.describe( Blaze.red( reject_number_type.message ) )
    }else
        tttt.describe( Blaze.green( '##  test passed' ) )


    const resolve_string_type = await tttt.oki( async () => {

        tttt.describe( Blaze.yellow( '##  -2' ), Blaze.color( 33, ' given a string value to --static-files=public will go through' ) )

        return {
            expected: 'public',
            actual : await static_files_flag( 'public' ).catch( error => error.message ),
            error: '## the expected result mismatched'
        }
    } )

    if( resolve_string_type instanceof Error ) {
        tttt.failed( true )
        tttt.describe( Blaze.red( resolve_string_type.message ) )
    }else
        tttt.describe( Blaze.green( ' test passed' ) )

    tttt.end_test( id )
}
