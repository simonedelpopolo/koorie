import { extname } from 'path'
import { default as routing } from '../routing.js'
import {
    resource_get_application,
    resource_get_image,
    resource_get_public,
    resource_get_text,
    resource_get_video
} from '../../../index.js'

const fileSymbol = Symbol( 'Object [ koorie.routing.file ]' )
const file = Object.defineProperty( routing, fileSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.routing.file ]
     * elaborates the ServerResponse based on the requested file.
     *
     * @param {string} filename - filename of the requested resource
     * @param {Readable} readable - readable
     * @param {ServerResponse} Outgoing - outgoing
     * @returns {Promise<{Object}>|Object}
     */
    value: async function routing_file( filename, readable, Outgoing ) {
        let response_ready = true
        let error = false
        let buffer

        const public_path = resource_get_public()

        if ( extname( filename ) === '' )
            filename = `${ public_path }/index.html`

        const resource = filename.replace( `${ public_path }/`, '' )
        const resource_extension = extname( filename )

        Outgoing.statusCode = 200
        Outgoing.statusMessage = 'Ok'
        Outgoing.setHeader( 'koorie', 200 )

        if ( resource === '' )
            Outgoing.setHeader( 'content-type', 'text/html' )


        if ( resource_get_image().includes( resource_extension ) ) {

            const image_content_type = resource_extension.replace( '.', '' )

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

            const video_content_type = resource_extension.replace( '.', '' )
            Outgoing.setHeader(
                'content-type',
                `video/${ video_content_type }` )

        }

        if ( resource_get_text().includes( resource_extension ) ) {

            let text_content_type = resource_extension.replace( '.', '' )

            if ( text_content_type === 'js' || text_content_type === 'mjs' )
                text_content_type = 'javascript'



            Outgoing.setHeader(
                'content-type',
                `text/${ text_content_type }` )
        }

        if ( resource_get_application().includes( resource_extension ) ) {

            const application_content_type = resource_extension.replace( '.', '' )

            Outgoing.setHeader(
                'content-type',
                `application/${ application_content_type }` )
        }

        readable.on( 'end', () => Outgoing.end() )

        let chunk

        while ( null !== ( chunk = readable.read() ) ) {
            buffer = Buffer.from( chunk )
            Outgoing.write( chunk )
        }

        return {
            buffer: buffer,
            response_ready: response_ready,
            error: error
        }
    }
} )

export default file[ fileSymbol ]
