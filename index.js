#!/usr/bin/env node
import routes from './middleware.js'
import { flags, server } from './whisk.js'

// Splicing out from `process.argv` the paths for node and index.js
process.argv.splice( 0, 2 )

// Process name.
process.title = 'koorie'

await routes()
await server( await flags( process.argv ) )
