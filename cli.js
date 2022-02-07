#!/usr/bin/env node
import { flags } from './whisk.js'

// Splicing out from `process.argv` the paths for node and cli.js
process.argv.splice( 0, 2 )

// Process name.
process.title = 'koorie-cli'

await flags( process.argv )
