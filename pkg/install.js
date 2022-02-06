import { constants } from 'fs'
import { parse } from 'json-swiss-knife'
import { string_ } from 'oftypes'
import { access, cp, readFile, rm, writeFile } from 'fs/promises'

await cp( './pkg/files/', '../../', { recursive:true, force:true } ).catch( error => console.log( error ) )

const package_json_koorie = await parse( await readFile( './package.json' ) )

delete package_json_koorie.scripts.postinstall

const buffer = Buffer.from( JSON.stringify( package_json_koorie ) )
await writeFile( './package.json', buffer )
    .catch( error => { throw error } )

const fileExist = await access( '../../package.json', constants.F_OK ).catch( error => error.message )
if( await string_( fileExist ) ){
    const package_json_root = {
        scripts: {
            'koorie.serve':'node index.js',
        },
        type: 'module',
        dependencies: { 'koorie':'latest' }
    }
    
    await writeFile( '../../package.json', JSON.stringify( package_json_root ), { flag: 'w' } )
        .catch( error => {throw error} )
}

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
