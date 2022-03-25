import { request } from 'https'

/**
 * The server.functions.http_request
 * run once, when the protocol is HTTPS, a request to fully load/cache everything in Node.js
 * First response time is longer than any other happening after that one.
 *
 * @returns {{(options: (RequestOptions | string | URL), callback?: (res: IncomingMessage) => void): ClientRequest; (url: (string | URL), options: RequestOptions, callback?: (res: IncomingMessage) => void): ClientRequest}}
 */
export function https_request() {
    return request
}
