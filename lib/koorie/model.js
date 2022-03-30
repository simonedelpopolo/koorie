import koorie from '../koorie.js'
import { model_selector, process_exit, shell_exit_codes } from '../../index.js'

const modelSymbol = Symbol( 'Object [ koorie.model ]' )
const model = Object.defineProperty( koorie, modelSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

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
    value: async function model( library_name, filename ){

        switch ( library_name ) {

            case 'false':

                return model_selector( filename )

            case 'react':

                return model_selector( filename )

            case 'solid':

                return model_selector( filename )

            case 'vue':

                return model_selector( filename )

            case 'static':

                return model_selector( filename )

            default:

                await process_exit( `${process.env.LIBRARY} not recognize. please select [static|react|solid|vue]`, new TypeError( 'Object [ koorie.model ] - library error' ), shell_exit_codes.flags )

        }

    }
} )

export default model[ modelSymbol ]

