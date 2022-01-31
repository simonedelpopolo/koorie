#!/usr/bin/env node
import routes from './routes.js'
import { flags, server } from 'koorie'

// Splicing out from `process.argv` the paths for node and executable.js
process.argv.splice( 0, 2 )

// Process name.
process.title = 'koorie'

await routes()
await server( await flags( process.argv ) )
