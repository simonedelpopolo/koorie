/**
 * The server.listen() message.
 *
 * @returns {string}
 */
export function listen_text(){

    return `${ 'koorie your browser here ⬇ '.magenta() }︎
${ process.env.PROTOCOL }://${ process.env.ADDRESS }:${ process.env.PORT }
${ '----------------------------------------------------'.green() }
${process.env.HEALTH_KEY === 'false' ? 'health-route not set' : 'health_key => '.cyan().underline().strong() + process.env.HEALTH_KEY.green().underline().strong()}`
}
