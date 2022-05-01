import { Answer, host_os, os_uptime } from '../../private.js'

/**
 * Object [ koorie.health ]
 * Route - health.
 *
 * @param {IncomingMessage} Incoming - The given IncomingMessage Object.
 * @param {ServerResponse} Outgoing - The given ServerResponse Object.
 * @returns {Promise<{buffer:Buffer}> | {buffer:Buffer}}
 */
export default async function health( Incoming, Outgoing ) {

    let system = false
    let authorized = true

    /**
     *
     * @type {URLSearchParams|{empty:string}|{invalid:string}}
     */
    const health_key = await Answer.toGet(
        await Answer.getQuestion( 'params' )
            .catch( error => error ), process.env.HEALTH_KEY )
        .catch( error => error )

    if( health_key.empty ) {
        authorized = false
        Outgoing.setHeader( 'error', health_key.empty )
    }

    else if( health_key.invalid ){
        authorized = false
        Outgoing.setHeader( 'error', 'Answer.toGet(params, path=[has an invalid value, it should be set to "health"])' )
    }

    else if( Incoming.method !== 'GET' )
        authorized = false

    else{
        let count = 0
        for( let key of health_key.keys() ) {

            count++
            if( count > 1 ) {
                authorized = false
                Outgoing.setHeader( 'error', 'too many keys.' )
                break
            }

            if( key !== 'key' ){
                authorized = false
                Outgoing.setHeader( 'error', `key name mismatch. given key => ${key}` )
                break
            }
        }
        if( authorized === true ) {
            if ( health_key.get( 'key' ) !== process.env.HEALTH_KEY ) {
                Outgoing.setHeader( 'error', `give key mismatch -> ${ health_key.get( 'key' ) }` )
                authorized = false
            } else {

                system = {
                    system: {
                        arch: host_os().arch,
                        platform: host_os().platform,
                        uptime: os_uptime(),
                    },
                    koorie: {
                        version: await ( await import( '../../package.json', { assert: { type: 'json' } } ) ).default.version,
                    },
                }
            }
        }
    }

    return new Answer( ( good, bad ) => {

        if( !authorized ) {
            Outgoing.statusCode = 401
            Outgoing.statusMessage = 'unauthorized'
            bad( Buffer.from( 'no talk to strangers' ) )
        }else {

            Outgoing.statusCode = 200
            Outgoing.statusMessage = 'authorized'
            good( Buffer.from( JSON.stringify( system ) ) )
        }
    } )
}
