import { default as collection } from './collection.js'

/**
 * Object [ koorie.routes.inject ].
 *
 * @param {{}} route - the route imported or ejected
 */
export default async function inject ( route ){
    collection.push( route )
}
