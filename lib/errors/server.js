import errors from '../errors.js'

export const serverErrorsSymbol = Symbol( 'Koorie Errors Codes' )
export const serverErrors = Object.defineProperty( errors, serverErrorsSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: {
    
    }
} )

const internal_ = serverErrors[ serverErrorsSymbol ]
