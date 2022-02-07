#!/usr/bin/env node
( await import( `${ process.cwd() }/middleware.js` ) ).default()
import { flags, server } from './whisk.js'

// Splicing out from `process.argv` the paths for node and index.js
process.argv.splice( 0, 2 )

// Process name.
process.title = 'koorie'

await server( await flags( process.argv ) )
