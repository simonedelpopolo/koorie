import { createSecureServer } from 'node:http2'
import { readFileSync } from 'node:fs'
import { default as server } from '../server.js'

/**
 * - generate self-signed certificate.
 *   openssl req -x509 -newkey rsa:4096 -keyout koorie-key.pem -out koorie-cert.pem -sha256 -days 365 -nodes -subj '/CN=localhost'
 *
 * @type {symbol}
 */
export default Object.defineProperties( server,
    {
        [ Symbol.for( 'koorie.server.http2' ) ]:{
            enumerable: true,
            writable: false,
            configurable: false,

            /**
             * Object [ koorie.server.http2 ].
             *
             * @param {string} key - path to the key file.
             * @param {string} cert - path to the cert file
             * @param {string|null=} dhparam - path to the dhparam file.
             * @returns {Promise<Server> | Server}
             */
            value: async function http2( key, cert, dhparam = null ) {

                return createSecureServer( {
                    key: readFileSync( key ),
                    cert: readFileSync( cert ),
                    dhparam: dhparam !== null ? readFileSync( dhparam ) : null,
                    allowHTTP1: true
                } )
            }
        }
    }
)
