#!/usr/bin/env node --experimental-json-modules --experimental-import-meta-resolve --trace-warnings --no-warnings
import { config, server } from './private.js'
import { null_, resolvers, undefined_ } from 'oftypes'

// - splicing out from `process.argv` the paths for node and koorie.js
process.argv.splice( 0, 2 )

// - process.title
process.title = 'koorie'

/**
 * @type { KoorieServerArgumentProperties }
 */
const options = await config()

const truthy = () => server( null )
const falsy = async () => {

    const truthy = async () => {
        ( await import( `${ process.cwd() }/middleware.js` ) ).default()
        await server( options )
    }

    const falsy = async () => {
        if( options.middleware === 'off' )
            await server( options )
        else{
            ( await import( `${ process.cwd() }/${ options.middleware }` ) ).default()
            await server( options )
        }
    }

    ( await undefined_( options.middleware, await resolvers( truthy, falsy ) ) )()
}

( await null_( options, await resolvers( truthy, falsy ) ) )()
