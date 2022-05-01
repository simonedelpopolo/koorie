import { default as config_parser_get } from './config/parser/get.js'
import { default as config_parser_set } from './config/parser/set.js'
import { entry_point } from '@cli-blaze/input'
import { koorie_process } from '../../private.js'

/**
 * Object [ koorie.config ]
 * koorie configuration file function.
 *
 * @param {string=} path - path to your configuration file. Default ./.koorierc in the root directory of the project.
 * @param { boolean=} process_cwd - default the absolute path starts from process.cwd(). set it to false and, it will use just the argument 'path'.
 * @returns {Promise<Object> | Object}
 */
export default async function configuration( path = '.koorierc', process_cwd = true ){

    let options

    // Object [ config.parser.get ]
    // - reads and parses the content of the file .koorierc or the one you specified in the path.
    // - emit('read') in case koorierc was found in the root directory of the project.
    // - emit('proceed') in case koorierc was NOT found in the root directory of the project.
    config_parser_get( path, process_cwd )

    // Object [ config.parser.set ]
    // - Promise that always resolve after the event [config.parser.get[read] or config.parser.get[proceed] ] are fired.
    // - when "proceed" it passes to Object [ input.entry_point ] the process.argv.
    const config_ = await config_parser_set()

    if ( config_.includes( 'proceed' ) )

        options = await entry_point( process.argv, { 'koorie':koorie_process, executable:[ 'koorie' ] } )

    else if ( !config_.includes( 'proceed' ) ) {

        let config_args

        config_args = await entry_point( config_, { 'koorie':koorie_process, executable:[ 'koorie' ] } )

        options = config_args
    }

    return options
}
