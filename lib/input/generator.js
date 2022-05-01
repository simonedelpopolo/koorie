/**
 * Object [ input.generator ]
 * type check for flag.
 *
 * @param {any} logic - check
 * @yields
 * @returns {AsyncGenerator<any, Error, *>}
 */
export default async function* generator( logic ) {
    for ( const routine of logic.routine )
        yield routine( logic.flag )
}
