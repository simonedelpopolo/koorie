#!/usr/bin/env node
import { config_get, config_set, entry_point, server } from './index.js'
import { null_, undefined_ } from 'oftypes'

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
async function configuration (){
    let options
    
    // Object [ config.parser.get() ]
    // - reads and parses the content of the file .koorierc.
    // - emit('read') in case koorierc was found in the root directory of the project.
    // - emit('proceed') in case koorierc was NOT found in the root directory of the project.
    config_get()
    
    // Object [ config.parser.set() ]
    // - Promise that always resolve after the event [config.parser.get[read] or config.parser.get[proceed] ] fired.
    // - when "proceed" it passes to Object [ input.entry_point ] the process.argv.
    // - when "read" it first checks for the "false_flag" passed in phase of forking then it passes the configuration loaded from .koorierc
    const config_ = await config_set()
    
    if( config_ === 'proceed' ) {
        
        const entry_point_run = await entry_point( process.argv )
        
        options = await entry_point_run.value
    }else {
        
        let config_args
        
        if( process.argv.includes( '--false-flag=true' ) ) {
            config_.push( '--false-flag=true' )
            config_args = await entry_point( config_ )
        }
        
        else
            config_args = await entry_point( config_ )
        
        options = await config_args.value
    }
    
    return options
}

const options = await configuration()

const resolversNull = {
    
    false:( async() => {
        
        const resolversUndefined = {
            
            false:( async() => {
                ( await import( `${ process.cwd() }/${options.middleware || options.ml}` ) ).default()
                await server( options )
            } ),
            
            true: ( async () => {
                ( await import( `${ process.cwd() }/middleware.js` ) ).default()
                await server( options )
            } )
            
        };
        
        ( await undefined_( options.middleware || options.ml, resolversUndefined ) )()
    } ),
    
    true: ( async () => {
        ( await import( `${ process.cwd() }/middleware.js` ) ).default()
        await server( options )
    } )
};

( await null_( options, resolversNull ) )()

