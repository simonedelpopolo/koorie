#!/usr/bin/env node
import { flags, server } from './index.js'
import { null_, undefined_ } from 'oftypes'

// Splicing out from `process.argv` the paths for node and koorie.js
process.argv.splice( 0, 2 )

// Process name.
process.title = 'koorie'

const server_flags = await flags( process.argv )

const resolversNull = {
    
    false:( async() => {
        
        const resolversUndefined = {
            
            false:( async() => {
                ( await import( `${ process.cwd() }/${server_flags.middleware || server_flags.ml}` ) ).default()
                await server( server_flags )
            } ),
            
            true: ( async () => {
                ( await import( `${ process.cwd() }/middleware.js` ) ).default()
                await server( server_flags )
            } )
            
        };
        
        ( await undefined_( server_flags.middleware || server_flags.ml, resolversUndefined ) )()
    } ),
    
    true: ( async () => {
        ( await import( `${ process.cwd() }/middleware.js` ) ).default()
        await server( server_flags )
    } )
};

( await null_( server_flags, resolversNull ) )()

