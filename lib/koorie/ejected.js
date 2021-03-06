import { entry_point } from '@cli-blaze/input'
import { koorie_process } from '../../private.js'
import { oftype_ } from 'oftypes'
import { resew_prop_val } from '@cli-blaze/dissection'

/**
 * Object [ koorie.ejected ].
 * This Object ejects koorie from the shell.
 *
 * @param {KoorieServerArgumentProperties} initializer - the initializer object that replace process.argv
 * @returns {Promise<KoorieServerArgumentProperties> | KoorieServerArgumentProperties}
 */
export default async function ejected( initializer ) {

    const ejected_argv = []
    let argv = ''
    for ( const flag in initializer ) {

        if( await oftype_( initializer[ flag ] ) === 'Object' )
            argv = `--${ flag.replace( /_/g, '-' ) }=${ await resew_prop_val( initializer[ flag ] ) }`

        else
            argv = `--${ flag.replace( /_/g, '-' ) }${ typeof initializer[ flag ] === 'undefined' ? '' : '=' + initializer[ flag ]  }`

        ejected_argv.push( argv )
    }

    // - splicing out from `process.argv` the paths for node and koorie.js
    process.argv.splice( 0, 2 )
    process.argv = ejected_argv

    return entry_point( process.argv, { 'koorie': koorie_process, executable:[ 'koorie' ] }, 'koorie' )

}
