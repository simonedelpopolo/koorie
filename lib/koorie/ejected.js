import koorie from '../koorie.js'
import { oftype_ } from 'oftypes'
import { process_title, processors } from '../../index.js'

const ejectedSymbol = Symbol( 'Object [ koorie.ejected ]' )
const ejected = Object.defineProperty( koorie, ejectedSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Object [ koorie.ejected ].
     * This Object ejects koorie from the shell.
     *
     * @param {{
     *      port:number,
     *      address:string,
     *      cluster:number,
     *      ejected: string|undefined,
     *      library: string,
     *      logger:{quiet:boolean, write:string},
     *      hot:undefined,
     *      response_time:string,
     *      secure:{active:boolean,key:string,cert:string, dhparam: string},
     *      socket:{active:boolean, path:string},
     *      static_files:string} |
     *      null} initializer - the initializer object that replace process.argv
     * @returns {Promise<void>}
     */
    value: async function ejected( initializer ) {

        const ejected_argv = []
        let argv = ''
        for ( const flag in initializer ) {
            if( await oftype_( initializer[ flag ] ) === 'Object' ){
                let option = ''

                for ( const options in initializer[ flag ] )
                    option += `${ options }:${ initializer[ flag ][ options ] }:`

                argv = `--${ flag.replace( '_', '-' ) }='options(${ option }`
                argv = argv.slice( 0, -1 ) + ')\''
            }else
                argv = `--${ flag.replace( '_', '-' ) }${ typeof initializer[ flag ] === 'undefined' ? '' : '=' + initializer[ flag ]  }`

            ejected_argv.push( argv )
        }

        // - splicing out from `process.argv` the paths for node and koorie.js
        process.argv.splice( 0, 2 )
        process.title = 'koorie'

        process.argv = ejected_argv

        // - input.process_title is an async function generator
        const process_title_switcher = await process_title(
            await processors( ejected_argv )
        )

        // - save the yield
        const done = await process_title_switcher.next()

        // - return the 'return' of the async generator to set it "done" and free resources.
        return process_title_switcher.return( done.value )
            .then( object => object.value )
    }
} )

export default ejected[ ejectedSymbol ]
