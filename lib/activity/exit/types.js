import { default as exit } from '../exit.js'
import { buffer_, number_, string_ } from 'oftypes'
import { shell_exit_codes, stderr } from '../../../index.js'

const exit_typesSymbol = Symbol( 'Object [ activity.exit.types ]' )
const exit_types = Object.defineProperty( exit, exit_typesSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * @type {{actual: string[], reject: ((function(*, *): Promise<void>)|*), expected: string[], check: ((function(*, *, *): AsyncGenerator<*|Promise<never>|Promise<boolean>|Promise|PromiseFulfilledResult<*>, void, *>)|*)}}
     */
    value: {

        check: async function * exit_arguments_type( message, error_type, exit_code ){

            // [0] oftypes <string|Buffer> for message argument. rejects with the argument name.
            const string_buffer_resolvers = { true: Promise.resolve( true ), false: Promise.reject( { argument:'`message`', expected: 'oftypes <string|Buffer>.' } ) }
            yield await ( await string_( message, string_buffer_resolvers ) || await buffer_( message, string_buffer_resolvers ) )

            // [1] instanceof <Error> for error_type argument. rejects with the argument name.
            yield !( error_type instanceof Error ) ? Promise.reject( { argument:'`error_type`', expected: 'oftypes <Error>.' } ) : Promise.resolve( true )

            // [2] oftypes <number> for exit_code argument. rejects with the argument name.
            yield await number_( exit_code, {
                false: Promise.reject( { argument:'`exit_code`', expected: 'oftypes <number>.' } ),
                true: Promise.resolve( true )
            } )
        },

        reject: async ( argument, rejected ) => {

            internal_.expected[ 1 ] = rejected.argument
            internal_.expected[ 3 ] = rejected.expected

            internal_.actual[ 0 ] = rejected.argument
            internal_.actual[ 2 ] = internal_.actual[ 2 ].green()
            internal_.actual[ 3 ] = ( typeof argument.toString() ).green()
            internal_.actual[ 4 ] = internal_.actual[ 4 ].green()
            internal_.actual[ 6 ] = JSON.stringify( argument ).red()

            await stderr( `\n ${internal_.expected.join( ' ' ).bg_color( 160 ).color( 255 )}\n\t ${internal_.actual.join( ' ' )}\n\n ${new TypeError( '[stacktrace]' ).stack}\n\n`  )

            process.exit( shell_exit_codes.type_checking )

        },
        expected:[
            '[activity.exit.types - TypeError]',
            null,
            'argument expected to be',
            null,
        ],
        actual:[
            null,
            ':',
            '{',
            null,
            '}',
            ' -> ',
            null,
        ]
    }

} )

const internal_ = exit_types[ exit_typesSymbol ]

export default exit_types[ exit_typesSymbol ]
