import { Blaze } from '@cli-blaze/decors'
import { options } from '@cli-blaze/input'
import { true_false } from 'boolean-jokes'
import { boolean_, number_, undefined_ } from 'oftypes'

/**
 * Object [ input.logger_flag ].
 *
 * - logger_flag type check.
 *
 * @param {string} option - the value from the shell.
 * @throws { Error }
 * @returns {Promise<{logger:{write:string|null, quiet:boolean}, error:any}|Error|undefined>|{logger:{write:string|null, quiet:boolean, error:any}}|Error|undefined}
 */
export default async function logger_flag( option ){

    /**
     * Type checking for options write logger flag.
     *
     * @param {any} check - value from flag.
     * @yields
     * @returns {AsyncGenerator<Promise<unknown>|Promise<never>, void, *>}
     */
    async function* write_option( check ){

        const resolvers = {

            true: ( () => {
                return null
            } ),
            false: ( async () => {

                const resolvers = {

                    true: ( () => {
                        return Promise.reject( '--logger=write:<string|null> accept only string|null.' )

                    } ),
                    false:( () => {
                        return Promise.resolve( check )
                    } )
                }

                return ( await number_( check, resolvers ) )()
            } )
        }

        yield ( await undefined_( check, resolvers ) )()
    }

    /**
     * Type checking for options quite logger flag.
     *
     * @param {any} check - value from flag.
     * @yields
     * @returns {AsyncGenerator<Promise<unknown>|Promise<never>, void, *>}
     */
    async function* quite_option_( check ){

        const resolvers = {

            true: ( () => {

                return Promise.resolve( false )
            } ),

            false: ( async () => {

                const boolean = await true_false( check ).catch( error => error )
                const resolvers = {
                    true:( () => {
                        return Promise.resolve( boolean )
                    } ),
                    false:( () => {
                        return Promise.reject( '--logger=quiet:<boolean> accept only boolean.' )
                    } )
                }

                return ( await boolean_( boolean, resolvers ) )()

            } )
        }

        yield ( await undefined_( check, resolvers ) )()
    }

    let flag
    const logger = {
        quiet: null,
        write: null
    }

    const resolvers = {

        true:() => {

            return undefined
        },
        false: async () => {

            let { quiet, write, error } = await options( option, Blaze.green( Blaze.underline( '--logger=' ) ) )
            const loggerQuietGenerator = await quite_option_( quiet )
            const loggerWriteGenerator = await write_option( write )

            quiet = await loggerQuietGenerator.next()
                .then( resolve => resolve.value )
                .catch( error => new TypeError( error ) )

            logger.quiet = await loggerQuietGenerator.return( quiet ).catch( console.error )
                .then( resolve => resolve.value )

            write = await loggerWriteGenerator.next()
                .then( resolved => resolved.value )
                .catch( error => new TypeError( error ) )

            logger.write = await loggerWriteGenerator.return( write ).catch( console.error )
                .then( resolve => resolve.value )

            return { logger:logger, error:error }
        }
    }

    flag = await  ( await undefined_( option, resolvers ) )()

    return new Promise( ( resolve, reject ) => {

        if( flag.logger.quiet instanceof Error )
            reject( flag.logger.quiet )

        if( flag.logger.write instanceof Error )
            reject( flag.logger.write )

        if( flag.error instanceof Error )
            reject( flag.error )

        if( flag )
            resolve( flag )
    } )
}
