import * as tttt from 'trythistrythat'
import { default as middleware_flag } from '../lib/input/koorie/middleware_flag.js'

export default async () => {

    tttt.describe( '# UNIT test for the middleware_flag type checking'.underline().strong() )

    const reject_number_type = await tttt.oki( async () => {

        tttt.describe( '##  -1'.yellow(), ' given a number value to --middleware[-m]=3 will exit with code 2'.color( 33 ) )

        return {
            expected: `${ 'given option -> '.green() }'${'3'.red()}' - ${ process.title } flags-error`,
            actual : await middleware_flag( 3 ).catch( error => error.message ),
            error: '## the expected result mismatched'
        }
    } )

    if( reject_number_type instanceof Error ) {
        tttt.failed( true )
        console.error( reject_number_type.message.red() )
    }else
        console.log( '##  test passed'.green() )


    const resolve_string_type = await tttt.oki( async () => {

        tttt.describe( '##  -2'.yellow(), ' given a string value to --middleware[-m]=middleware.js will go through'.color( 33 ) )

        return {
            expected: 'middleware.js',
            actual : await middleware_flag( 'middleware.js' ).catch( error => error.message ),
            error: '## the expected result mismatched'
        }
    } )

    if( resolve_string_type instanceof Error ) {
        tttt.failed( true )
        console.error( resolve_string_type.message.red() )
    }else
        console.log( '##  test passed'.green() )

    tttt.end_test( tttt.id() )
}
