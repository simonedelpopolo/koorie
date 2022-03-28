import { health as health_route } from '../../../../index.js'
import { randomUUID } from 'crypto'
import { undefined_ } from 'oftypes'
import { routes_inject, routes_set } from '../../../../index.js'

/**
 * If the flag health is undefined inject the route.
 *
 * @param {string} flag - --health value.
 */
export async function health ( flag ){
    ( await undefined_( flag, { true: ( () => {
        process.env.HEALTH_KEY = 'false'

        return undefined

    } ),
    false: ( async () => {
        process.env.HEALTH_KEY = process.env.HEALTH_KEY !== 'false' ? process.env.HEALTH_KEY : randomUUID()
        await routes_inject( { route:'health', asyncFunction: health_route, incoming: process.env.HEALTH_KEY } )
        await routes_set()
    } ) } ) )()
}
