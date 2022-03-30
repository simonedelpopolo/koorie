import { deepStrictEqual } from 'node:assert/strict'
import { http_request } from '../../server/functions/http_request.js'
import { https_request } from '../../server/functions/https_request.js'
import { parse } from 'json-swiss-knife'
import { true_false } from 'boolean-jokes'
import { Answer, routes_collection, routes_inject, routes_injected, routes_set } from '../../../../index.js'

/**
 * Object [ koorie.initialize.functions.on_listening_check_request ]
 * check for the routing system
 * skip it by using --no-listening-check flag.
 *
 * @returns {Promise<void>}
 */
export async function on_listening_check_request(){

    /**
     * Object [ koorie.initialize.functions.on_listen.route ]
     * the checking route.
     *
     * @param {IncomingMessage} Incoming - IncomingMessage
     * @param {ServerResponse} Outgoing - ServerResponse
     * @returns {Answer<Buffer> | Buffer} - always resolves.
     */
    async function on_listening( Incoming, Outgoing ){

        const get_params = await Answer.toGet( await Answer.getQuestion( 'params' ).catch( error => error ), 'on_listening_get_params' ).catch( error => error )
        const body = await Answer.toPost( await Answer.getQuestion( 'body'  ).catch( error => error ), 'on_listening_get_params' ).catch( error => error )

        const params = {}
        get_params.forEach( function( value, key ) {
            params[ key ] = value
        } )

        Outgoing.setHeader( 'on-listening-request', 'true' )
        Outgoing.setHeader( 'on-listening-params', JSON.stringify( params ) )
        Outgoing.setHeader( 'on-listening-body', JSON.stringify( body ) )
        Outgoing.statusCode = 418

        return new Answer( ( good ) => {
            good( JSON.stringify( { 'on-listening-request': 'response' } ).toBuffer() )
        } )
    }

    await routes_inject( {
        route:'on_listening_request',
        asyncFunction:on_listening,
        incoming:'on_listening_get_params'
    } )
    await routes_set()

    const on_listening_check_request = await true_false( process.env.SECURE ) === true

        ? https_request()
        : http_request()

    const post_data = JSON.stringify( { post: 'body' } )

    const options = {
        hostname: `${process.env.ADDRESS}`,
        path: '/on_listening_request?get=params',
        port: process.env.PORT.toNumber(),
        method: 'POST',
        protocol: `${process.env.PROTOCOL}:`,
        rejectUnauthorized: false,
        requestCert: true,
        agent: false,
        headers:{
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength( post_data )
        }
    }

    const request = on_listening_check_request( options, response => {
        const buffer = []

        response.on( 'data', chunk => buffer.push( chunk ) )

        response.on( 'end', async () => {

            const actual = {
                code: response.statusCode,
                'on-listening-request': await true_false( response.headers[ 'on-listening-request' ] ).catch( error => error ),
                'on-listening-params' : response.headers[ 'on-listening-params' ],
                'on-listening-body' : response.headers[ 'on-listening-body' ],
                'response': await parse( Buffer.concat( buffer ) ).catch( error => error )
            }

            const expected = {
                code: 418,
                'on-listening-request': true,
                'on-listening-params': '{"get":"params"}',
                'on-listening-body': '{"post":"body"}',
                'response' : { 'on-listening-request': 'response' }
            }

            try{
                deepStrictEqual( actual, expected )
                routes_collection.pop()
                delete routes_injected.on_listening_request
                delete process.env.ON_LISTENING_CHECK_REQUEST
            }catch ( error ) {
                routes_collection.pop()
                delete routes_injected.on_listening_request
                delete process.env.ON_LISTENING_CHECK_REQUEST
                console.error( error )
            }
        } )

    } )

    request.on( 'error', error => console.error( `problem with request: ${error.message}` ) )

    request.write( post_data )
    request.end()

}
