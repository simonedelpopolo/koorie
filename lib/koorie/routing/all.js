import { buffer_, oftype_ } from 'oftypes'

/**
 * Object [ koorie.routing.all ]
 * elaborates the ServerResponse with the injected catch-all route.
 *
 * @param {Function|AsyncFunction} RouteExport - catch all route
 * @param {IncomingMessage} Incoming - incoming
 * @param {ServerResponse} Outgoing - outgoing
 * @returns {Promise<{Object}>|Object}
 */
export default async function routing_all( RouteExport, Incoming, Outgoing ) {

    let buffer = undefined
    let error = false

    /**
     * @type {Buffer|Error|Answer}
     */
    let RouteAnswer

    if( await oftype_( RouteExport ) === 'Function' ) {
        RouteAnswer = RouteExport( Incoming, Outgoing )

        if( RouteAnswer instanceof Promise )
            RouteAnswer = await RouteAnswer.catch( failed => failed )

    }
    else if( await oftype_( RouteExport ) === 'AsyncFunction' )
        RouteAnswer = await RouteExport( Incoming, Outgoing ).catch( failed => failed )

    // If data is Buffer the ServerResponse is ready to be sent
    if ( await buffer_( RouteAnswer ) === true ){
        buffer = RouteAnswer
        if ( Outgoing.hasHeader( 'error' ) ) {
            error = Outgoing.getHeader( 'error' )
            Outgoing.removeHeader( 'error' )
        }
    }

    else if( RouteAnswer instanceof Error ){
        Outgoing.statusCode = 500
        Outgoing.statusMessage = 'data type error'
        Outgoing.setHeader( 'koorie-error', 500 )
        buffer = Buffer.from( '{"internal":"error"}' )
        error = RouteAnswer.message
    }
    else {
        if( !Outgoing.writableEnded ) {
            Outgoing.statusCode = 500
            Outgoing.statusMessage = 'data type error'
            Outgoing.setHeader( 'koorie-error', 500 )
            error = 'buffer is NOT oftypes<Buffer> or is oftypes<undefined>'
            buffer = Buffer.from( '{"internal":"error"}' )
        }
    }

    return {
        buffer: buffer,
        response_buffer: true,
        error: error
    }
}
