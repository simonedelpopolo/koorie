import { Readable } from 'stream'
import { access, readFile } from 'node:fs/promises'

/**
 * Object [ koorie.model.read ].
 *
 * @param {string} filename - request filename and public path.
 * @returns {Promise<Readable|Error>|Readable|Error}
 */
export default async function model_read( filename ){

    let error

    error = await access( filename ).catch( error => error )

    if( error instanceof Error )
        return error

    const createReadStream = ( buffer ) => {

        return Readable.from( buffer )
    }

    return createReadStream( await readFile( filename ).catch( error => error ) )
}
