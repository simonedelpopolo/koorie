import { Blaze } from '@cli-blaze/decors'

/**
 * The server.listen() message.
 *
 * @returns {string}
 */
export function listen_text(){

    return `${ Blaze.magenta( 'koorie your browser here ⬇ ' ) }︎
${ process.env.PROTOCOL }://${ process.env.ADDRESS }:${ process.env.PORT }
${ Blaze.green( '----------------------------------------------------' ) }
${process.env.HEALTH_KEY === 'false' ? 'health-route not set' : Blaze.underline( Blaze.strong( Blaze.cyan( 'health_key => ' ) ) ) + Blaze.underline( Blaze.strong( Blaze.green( process.env.HEALTH_KEY ) ) )}`
}
