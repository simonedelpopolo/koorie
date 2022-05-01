import { extname } from 'path'
import {
    resource_get_application,
    resource_get_image,
    resource_get_public,
    resource_get_text,
    resource_get_video
} from '../../../private.js'

/**
 * Object [ koorie.routing.file ]
 * elaborates the ServerResponse based on the requested file.
 *
 * @param {string} filename - filename of the requested resource
 * @param {Readable} readable - readable
 * @param {ServerResponse} Outgoing - outgoing
 * @returns {Promise<{Object}>|Object}
 */
export default async function routing_file( filename, readable, Outgoing ) {
    let error = false

    const public_path = resource_get_public()

    if ( extname( filename ) === '' )
        filename = `${ public_path }/index.html`

    const resource = filename.replace( `${ public_path }/`, '' )
    const resource_extension = extname( filename )

    Outgoing.statusCode = 200
    Outgoing.statusMessage = 'Ok'
    Outgoing.setHeader( 'koorie', 200 )

    if ( resource === '' )
        Outgoing.setHeader( 'content-type', 'text/html; charset=utf-8' )


    if ( resource_get_image().includes( resource_extension ) ) {

        const image_content_type = resource_extension.replace( /\./g, '' )

        if ( image_content_type === 'svg' ) {
            Outgoing.setHeader(
                'content-type',
                `image/${ image_content_type }+xml` )

        } else {
            Outgoing.setHeader(
                'content-type',
                `image/${ image_content_type }` )
        }
    }

    if ( resource_get_video().includes( resource_extension ) ) {

        const video_content_type = resource_extension.replace( /\./g, '' )
        Outgoing.setHeader(
            'content-type',
            `video/${ video_content_type }` )

    }

    if ( resource_get_text().includes( resource_extension ) ) {

        let text_content_type = resource_extension.replace( /\./g, '' )

        if ( text_content_type === 'js' || text_content_type === 'mjs' )
            text_content_type = 'javascript'



        Outgoing.setHeader(
            'content-type',
            `text/${ text_content_type }` )
    }

    if ( resource_get_application().includes( resource_extension ) ) {

        const application_content_type = resource_extension.replace( /\./g, '' )

        Outgoing.setHeader(
            'content-type',
            `application/${ application_content_type }` )
    }

    readable.on( 'end', () => Outgoing.end() )


    let chunk
    let buffer = []
    while ( null !== ( chunk = readable.read() ) )
        buffer.push( chunk )

    buffer = Buffer.concat( buffer )
    Outgoing.end( buffer )

    return {
        buffer_content_length: Buffer.byteLength( buffer ),
        buffer_payload: buffer,
        error: error
    }
}
