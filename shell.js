#!/usr/bin/env node
import { entry_point } from '@cli-blaze/input'
import { override } from '@cli-blaze/decors'
import { shell_process } from './private.js'
import { init, performance, set, ssl } from './private.js'

await override()

// - splicing out from `process.argv` the paths for node and shell.js
process.argv.splice( 0, 2 )

// - process.title
process.title = 'koorie-shell'

/**
 *
 * @type {Promise|{command:{
 *     init:{
 *       middleware:string,
 *       name:string,
 *       description:string,
 *       version:string,
 *       author:string,
 *       license:string
 *     },
 *     performance:{
 *       refresh_rate:number,
 *       socket_path:string,
 *     },
 *     set:{
 *       hot:string,
 *       socket_path:string,
 *       inject: string
 *     },
 *     ssl:{
 *         generate: {
 *             path: string|boolean,
 *             key: string|boolean,
 *             cert:string|boolean,
 *             dhparam: string|boolean
 *         }
 *     }
 * }}}
 */
const shell = await entry_point( process.argv, { 'koorie-shell':shell_process, executable:[ 'koorie-shell' ] } )

if( typeof shell !== 'undefined' && typeof shell?.command !== 'undefined' ){
    // eslint-disable-next-line default-case
    switch ( Object.entries( shell.command )[ 0 ][ 0 ] ){

        // Switcher for recognized commands no need for default case.
        // Checks have been done at Object [ input.entry_point ]
        case 'init':

            await init( shell.command.init )

            break

        case 'performance':

            await performance( shell.command.performance )

            break

        case 'set':


            await set( shell.command.set )

            break

        case 'ssl':

            await ssl( shell.command.ssl.generate )

            break

        case 'route':



            break

    }
}

