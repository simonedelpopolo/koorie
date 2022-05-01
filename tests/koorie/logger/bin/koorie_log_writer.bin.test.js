import { Answer, ejected, routes_inject, routes_set, server } from '../../../../index.js'

await routes_inject( { route: '', asyncFunction: async () => new Answer( good => good( Buffer.from( '{"log-writer":"test"}' ) ) ) } )
await routes_set()

await server( await ejected( {
    port: 36586,
    static_files: 'public',
    experimental_log_writer: undefined,
    logger: { quiet: true, write:'logs/log.json' },
    middleware: 'without',
    response_time: 'false',
    silenced: undefined
} ) )
