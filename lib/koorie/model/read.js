import { default as model } from '../model.js'
import { Readable } from 'stream'
import { access, readFile } from 'node:fs/promises'

const model_readSymbol = Symbol( 'Object [ koorie.model.read ]' )
const model_read = Object.defineProperty( model, model_readSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.model.read ].
     *
     * @param {string} filename - request filename and public path.
     * @returns {Promise<Readable|Error>|Readable|Error}
     */
    value: async function model_read( filename ){

        let error

        error = await access( filename ).catch( error => error )

        if( error instanceof Error )
            return error

        const createReadStream = ( buffer ) => {

            return Readable.from( buffer )
        }

        return createReadStream( await readFile( filename ).catch( error => error ) )
    }
} )

export default model_read[ model_readSymbol ]
