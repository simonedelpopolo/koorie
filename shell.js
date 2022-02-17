#!/usr/bin/env node
import { entry_point, init } from './index.js'

// - splicing out from `process.argv` the paths for node and shell.js
process.argv.splice( 0, 2 )

// - process.title
process.title = 'koorie-shell'

const entry_point_run = await entry_point( process.argv )

const shell = await entry_point_run.value

// eslint-disable-next-line default-case
switch ( shell.command ){
    
    // Switcher for recognized commands no need for default case.
    // Checks have been done at Object [ input.entry_point ]
    case 'init':
        delete shell.command
        
        await init( shell )
        break
    
}
