import { createServer } from 'node:http'

/**
 * Object [ koorie.server.http ].
 *
 * @returns {Promise<Server> | Server}
 */
export default async function http() {
    return createServer()
}
