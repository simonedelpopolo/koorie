import { Blaze } from '@cli-blaze/decors'
import { generator } from '../../../private.js'
import { number_, OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * Object [ input.type.only_string ]
 *
 * @param {any} flag - returned
 * @param {any} resolves - value
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export default async function only_string( flag, resolves ) {

    const truthy = () => resolves
    const falsy = async () => {
        const logic = {
            flag: flag,
            routine: [
                async ( type ) => {
                    if( await number_( type, undefined, undefined ) === true )
                        return new OftypesError( `${ Blaze.green( 'given option -> ' ) }'${ Blaze.red( type.toString() )}' - ${ process.title } flag-error` )
                    else return type
                }
            ]
        }

        let type

        for await( const check of await generator( logic ) ){
            if( check instanceof Error ) {
                type = check
                break
            }
            type = check
        }

        return type
    }

    return ( await undefined_( flag, await resolvers( truthy, falsy ) ) )()
}
