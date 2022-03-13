import { extname } from 'node:path'
import { default as library } from '../library.js'
import { access, readFile } from 'node:fs/promises'

const library_readSymbol = Symbol( 'Object [ koorie.library.read ]' )
const library_read = Object.defineProperty( library, library_readSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.library.read ].
     *
     * @param {{filename:string, public_path:string}} resources - request filename and public path.
     * @returns {Promise<Buffer|(void&Error)>|Buffer|(void&Error)}
     */
    value: async function library_read( resources ){

        let error
        let filename = resources.filename
        let public_path = resources.public_path

        if( extname( filename ) === '' )
            filename = `${public_path}/index.html`

        const resource_ = filename.replace( `${public_path}/`, '' )

        if( resource_ === '' )
            filename = `${resources.public_path}/index.html`

        error = await access( filename ).catch( error => error )

        if( error instanceof Error )
            return error

        return readFile( filename )
    }
} )

export default library_read[ library_readSymbol ]
