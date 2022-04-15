import { entry_point } from '@cli-blaze/input'
import koorie from '../koorie.js'
import { koorie_process } from '../../input.js'
import { oftype_ } from 'oftypes'

const ejectedSymbol = Symbol( 'Object [ koorie.ejected ]' )
const ejected = Object.defineProperty( koorie, ejectedSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.ejected ].
     * This Object ejects koorie from the shell.
     *
     * @param {KoorieServerArgumentProperties} initializer - the initializer object that replace process.argv
     * @returns {Promise<KoorieServerArgumentProperties> | KoorieServerArgumentProperties}
     */
    value: async function ejected( initializer ) {

        const ejected_argv = []
        let argv = ''
        for ( const flag in initializer ) {
            if( await oftype_( initializer[ flag ] ) === 'Object' ){
                let option = ''

                for ( const options in initializer[ flag ] )
                    option += `${ options }:${ initializer[ flag ][ options ] }:`

                argv = `--${ flag.replace( /_/g, '-' ) }='options(${ option }`
                argv = argv.slice( 0, -1 ) + ')\''
            }else
                argv = `--${ flag.replace( /_/g, '-' ) }${ typeof initializer[ flag ] === 'undefined' ? '' : '=' + initializer[ flag ]  }`

            ejected_argv.push( argv )
        }

        // - splicing out from `process.argv` the paths for node and koorie.js
        process.argv.splice( 0, 2 )
        process.title = 'koorie'

        process.argv = ejected_argv

        return entry_point( process.argv, { 'koorie': koorie_process, executable:[ 'koorie' ] } )

    }
} )

export default ejected[ ejectedSymbol ]
