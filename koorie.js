#!/usr/bin/env node
import { config_parser_get, config_parser_set, entry_point, server } from './index.js'
import { null_, resolvers, undefined_ } from 'oftypes'

// - splicing out from `process.argv` the paths for node and koorie.js
process.argv.splice( 0, 2 )

// - process.title
process.title = 'koorie'

/**
 * This function return the parsed commands, flags and options.
 * The options to be parsed can come from Object[ config.parser ] or process.argv.
 *
 * These options will be checked and given back as an object by Object[ input.entry_point ].
 *
 * @returns {object}
 */
async function configuration() {
    let options

    // Object [ config.parser.get ]
    // - reads and parses the content of the file .koorierc.
    // - emit('read') in case koorierc was found in the root directory of the project.
    // - emit('proceed') in case koorierc was NOT found in the root directory of the project.
    config_parser_get()

    // Object [ config.parser.set ]
    // - Promise that always resolve after the event [config.parser.get[read] or config.parser.get[proceed] ] are fired.
    // - when "proceed" it passes to Object [ input.entry_point ] the process.argv.
    const config_ = await config_parser_set()

    if ( config_.includes( 'proceed' ) )

        options = await entry_point( process.argv )

    else if ( !config_.includes( 'proceed' ) ) {

        let config_args

        config_args = await entry_point( config_ )

        options = config_args
    }

    return options
}

/**
 * @type { Object | null }
 */
const options = await configuration()

const truthy = () => server( null )
const falsy = async () => {

    const truthy = async () => {
        ( await import( `${ process.cwd() }/middleware.js` ) ).default()
        await server( options )
    }

    const falsy = async () => {
        if( options.middleware === 'without' )
            await server( options )
        else{
            ( await import( `${ process.cwd() }/${ options.middleware }` ) ).default()
            await server( options )
        }
    }

    ( await undefined_( options.middleware, await resolvers( truthy, falsy ) ) )()
}

( await null_( options, await resolvers( truthy, falsy ) ) )()

