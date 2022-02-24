import errors from '../errors.js'

export const shellExitCodesSymbol = Symbol( 'Object [ errors.shell_exit_codes ] process.exit codes' )
export const shell_exit_codes = Object.defineProperty( errors, shellExitCodesSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * @type {{[p:string]:number}}
     */
    value: {
        commands: 1,
        flags: 2,
        type_checking: 3,
        internal: 4
    }
} )
