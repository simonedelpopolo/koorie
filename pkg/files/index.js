#!/usr/bin/env node
import { flags, routes, server } from 'koorie'

import { index } from './routes/index/route.js'
// Splicing out from `process.argv` the paths for node and executable.js
process.argv.splice( 0, 2 )

// Process name.
process.title = 'koorie'

routes[ '' ] = index
await server( await flags( process.argv ) )
