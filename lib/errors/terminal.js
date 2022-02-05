import errors from '../errors.js'

export const terminalErrorsSymbol = Symbol( 'Terminal Errors Codes' )
export const terminalErrors = Object.defineProperty( errors, terminalErrorsSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: {
    
    }
} )

const internal_ = terminalErrors[ terminalErrorsSymbol ]
