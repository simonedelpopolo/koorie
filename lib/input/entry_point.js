import input from '../input.js'
import { process_title, processors } from '../../index.js'

const entry_pointSymbol = Symbol( 'Object [ input.entry_point ]' )
const entry_point = Object.defineProperty( input, entry_pointSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [input.entry_point].
     * Shared entry point for the available executable files.
     * Its return an object from the given process.argv.
     * Object [input.process_title] elaborates commands, flags and options dispatching to the right process switching the process.title.
     *
     * @param {string[]} argv - The process.argv passed to the process.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return#using_return
     * @returns {Promise | object} - return the return of the async function generator to set it "done" and free resources.
     */
    value: async function entry_point( argv ){

        // - input.process_title is an async function generator
        const process_title_switcher = await process_title(
            await processors( argv )
        )

        // - save the yield
        const done = await process_title_switcher.next()

        // - return the 'return' of the async generator to set it "done" and free resources.
        return process_title_switcher.return( done.value )
            .then( object => object.value )

    },
} )

export default entry_point[ entry_pointSymbol ]

