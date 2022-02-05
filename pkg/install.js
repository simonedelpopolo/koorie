import { parse } from 'json-swiss-knife'
import { cp, readFile, rm, writeFile } from 'fs/promises'

await cp( './pkg/files/', '../../', { recursive:true, force:true } ).catch( error => console.log( error ) )

const package_json = await parse( await readFile( './package.json' ) )

delete package_json.scripts.postinstall

const buffer = Buffer.from( JSON.stringify( package_json ) )
await writeFile( './package.json', buffer )
    .catch( error => { throw error } )

const korieIndex = Buffer.from( `#!/usr/bin/env node
import routes from '../../middleware.js'
import { flags, server } from './whisk.js'

// Splicing out from \`process.argv\` the paths for node and index.js
process.argv.splice( 0, 2 )

// Process name.
process.title = 'koorie'

await routes()
await server( await flags( process.argv ) )
` )
await writeFile( './index.js', korieIndex, { flag: 'w' } )
    .catch( error => {throw error} )

await rm( './pkg', { force:true, recursive: true } )
