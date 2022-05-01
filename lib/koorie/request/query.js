import { request } from '../../../private.js'

/**
 * Object [ koorie.query ].
 *
 * @param {string} url - the url requested from the browser.
 * @returns {Promise<void>}
 */
export default async function query( url ){
    await request( 'insert', 'params', new URL( url ).searchParams )
}
