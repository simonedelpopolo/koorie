import errors from '../errors.js'

const shell_exit_codesSymbol = Symbol( 'Object [ errors.shell_exit_codes ]' )
const shell_exit_codes = Object.defineProperty( errors, shell_exit_codesSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * @type {{commands: 1, flags: 2, type_checking:3,internal:4}}
     */
    value: {
        commands: 1,
        flags: 2,
        type_checking: 3,
        internal: 4
    }
} )

export default shell_exit_codes[ shell_exit_codesSymbol ]

