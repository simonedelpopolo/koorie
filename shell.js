#!/usr/bin/env node
import { flags } from './index.js'

// Splicing out from `process.argv` the paths for node and cli.js
process.argv.splice( 0, 2 )

// Process name.
process.title = 'koorie-shell'

await flags( process.argv )
