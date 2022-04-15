import { createServer } from 'node:https'
import { readFileSync } from 'node:fs'
import { default as server } from '../server.js'

/**
 * - generate self-signed certificate.
 *   openssl req -x509 -newkey rsa:4096 -keyout koorie-key.pem -out koorie-cert.pem -sha256 -days 365 -nodes -subj '/CN=localhost'
 *
 * @type {symbol}
 */
const httpsSymbol = Symbol( 'Object [ koorie.server.https ]' )
const https = Object.defineProperty( server, httpsSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.server.https ].
     *
     * @param {string} key - path to the key file.
     * @param {string} cert - path to the cert file
     * @param {string|null=} dhparam - path to the dhparam file.
     * @returns {Promise<Server> | Server}
     */
    value: async function https( key, cert, dhparam = null ) {

        return createServer( {
            key: readFileSync( key ),
            cert: readFileSync( cert ),
            dhparam: dhparam !== null ? readFileSync( dhparam ) : null
        } )
    }
} )

export default https[ httpsSymbol ]
