import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { model_selector } from '../../private.js'

/**
 * Object [ koorie.model ]
 * - Recognizer for routes
 * - Switcher function for different javascript library to be served with koorie.
 *   ReactJS, SolidJS and others soon.
 *
 *
 * @param {string} library_name - The process.env.LIBRARY value will be the switcher.
 * @param {string} filename - The requested resource from the browser.
 * @returns {Promise<boolean|Readable|Error|string> | boolean|Readable|Error|string}
 */
export default async function model( library_name, filename ){

    switch ( library_name ) {

        case 'false':
        case 'react':
        case 'solid':
        case 'vue':
        case 'static':

            return model_selector( filename )

        default:

            await exit(
                `${process.env.LIBRARY} not recognize. please select [static|react|solid|vue]`,
                new TypeError( 'Object [ koorie.model ] - library error' ),
                error_code.FLAG
            )

    }

}

