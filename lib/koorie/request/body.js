import { request } from '../../../private.js'

/**
 * Object [ koorie.request.body ].
 *
 * @param {IncomingMessage} raw - the IncomingMessage raw body
 * @returns {Promise<void>|void}
 */
export default async function body( raw ){

    const buffer = []
    for await ( const chunk of raw )
        buffer.push( chunk )

    await request( 'insert', 'body', Buffer.concat( buffer ) )
}
