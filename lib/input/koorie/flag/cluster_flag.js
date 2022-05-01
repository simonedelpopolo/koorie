import { Blaze } from '@cli-blaze/decors'
import { generator, promise } from '../../../../private.js'
import { number_, OftypesError, resolvers, string_, undefined_ } from 'oftypes'

/**
 * Object [ input.cluster_flag ]
 *
 * - --cluster type check.
 *
 * @param {string} options - check
 * @throws { Error }
 * @returns {Promise<string|number|Error>|string|number|Error}
 */
export default async function cluster_flag( options ){

    let flag

    /**
     * Resolver true.
     *
     * @returns {boolean}
     */
    const truthy = () => true

    /**
     * Resolver false.
     *
     * @returns {Promise<*>}
     */
    const falsy = async () => {

        const logic = {
            flag: options,
            routine: [
                async ( flag ) => {
                    if( await number_( flag, undefined, undefined ) === true )
                        return parseInt( flag )
                    else if ( await string_( flag ) === true && flag === 'full' )
                        return flag
                    else
                        return new OftypesError( `${ Blaze.green( 'given option -> ' ) }'${ Blaze.red( flag.toString() )}' - ${ process.title } flag-error` )
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

    flag = await  ( await undefined_( options, await resolvers( truthy, falsy ) ) )()

    return promise( flag )
}
