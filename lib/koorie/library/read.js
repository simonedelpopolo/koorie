import { extname } from 'node:path'
import { undefined_ } from 'oftypes'
import { access, readFile } from 'node:fs/promises'
import { library, librarySymbol } from '../library.js'

export const readSymbol = Symbol( 'Object [ koorie.library.read ] read static files' )
export const read = Object.defineProperty( library[ librarySymbol ], readSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    value: async function read( resources ){
    
        let error
        let filename = resources.filename
        let public_path = resources.public_path
        
        if( extname( filename ) === '' )
            filename = `${public_path}/index.html`
        
        const resource_ = filename.replace( `${public_path}/`, '' )
    
        if( resource_ === '' )
            filename = `${resources.public_path}/index.html`
        
        error = await access( filename ).catch( error => error )
        
        if( await undefined_( error ) === false )
            return error
        
        return readFile( filename )
    }
} )
