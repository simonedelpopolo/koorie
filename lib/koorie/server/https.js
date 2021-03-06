import { createServer } from 'node:https'
import { readFileSync } from 'node:fs'

/**
 * - generate self-signed certificate.
 *   openssl req -x509 -newkey rsa:4096 -keyout koorie-key.pem -out koorie-cert.pem -sha256 -days 365 -nodes -subj '/CN=localhost'
 *
 * @type {symbol}
 */
/**
 * Object [ koorie.server.https ].
 *
 * @param {string} key - path to the key file.
 * @param {string} cert - path to the cert file
 * @param {string|null=} dhparam - path to the dhparam file.
 * @returns {Promise<Server> | Server}
 */
export default async function https( key, cert, dhparam = null ) {

    return createServer( {
        key: readFileSync( key ),
        cert: readFileSync( cert ),
        dhparam: dhparam !== null ? readFileSync( dhparam ) : null
    } )
}
