import * as tttt from 'trythistrythat'
import { default as options } from '../lib/input/options.js'

/**
 * Exports in module input.options.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

    tttt.describe( 'UNIT test for Object [ input.options ]' )

    const error = await tttt.deeeeepStrictEqual( async () => {

        return {
            expected :  { option1: 'value1', option2: 'value2' },
            actual : await options( 'options(option1:value1|option2:value2)' ),
            error: 'something wen wrong'
        }
    } )

    if( error instanceof Error ){
        tttt.failed( true )
        console.error( error.message.red() )
    }else
        console.log( 'test passed'.green() )


    tttt.end_test( id )

}
