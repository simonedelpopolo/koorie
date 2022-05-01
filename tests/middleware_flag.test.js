import * as tttt from 'trythistrythat'
import { Blaze } from '@cli-blaze/decors'
import { default as middleware_flag } from '../lib/input/koorie/flag/middleware_flag.js'

/**
 * Exports in module middleware_flag.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

    tttt.describe( Blaze.underline( Blaze.strong( '# UNIT test for the middleware_flag type checking' ) ) )

    const reject_number_type = await tttt.oki( async () => {

        tttt.describe( Blaze.yellow( '##  -1' ), Blaze.color( 33, ' given a number value to --middleware=3 will exit with code 2' ) )

        return {
            expected: `${ Blaze.green( 'given option -> ' ) }'${Blaze.red( '3' )}' - ${ process.title } flags-error`,
            actual : await middleware_flag( 3 ).catch( error => error.message ),
            error: '## the expected result mismatched'
        }
    } )

    if( reject_number_type instanceof Error ) {
        tttt.failed( true )
        tttt.describe( Blaze.red( reject_number_type.message ) )
    }else
        tttt.describe( Blaze.green( ' test passed' ) )


    const resolve_string_type = await tttt.oki( async () => {

        tttt.describe( Blaze.yellow( '##  -2' ), Blaze.color( 33, ' given a string value to --middleware=middleware.js will go through' ) )

        return {
            expected: 'middleware.js',
            actual : await middleware_flag( 'middleware.js' ).catch( error => error.message ),
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
