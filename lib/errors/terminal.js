import errors from '../errors.js'

export const koorieErrorsSymbol = Symbol( 'Koorie Errors Codes' )
export const koorieErrors = Object.defineProperty( errors, koorieErrorsSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: {
        flags: 1
    
    }
} )
