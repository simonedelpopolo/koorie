import input from '../input.js'

const processorSymbol = Symbol( 'Object [ input.processor ]' )
const processor = Object.defineProperty( input, processorSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Object [ input.processor ] parses the process.argv string[] and returns an object.
     *
     * @param { string[] } argv - the given process.argv.
     * @returns { Promise<{ object:{ [ p: string ]: any }, keys:string[] }> }
     */
    value: async function processor( argv ) {
    
        // - todo error handling for reg_expression
        const regExpression = /\s*[^-\s](?![-])[.?]*[=]*[.?]*\S*/g
        const argumentsString = argv.join( ' ' )
    
        let process_arguments = []
        const matches = Array.from( argumentsString.matchAll( regExpression ), matches => matches[ 0 ] )
    
        // - todo error handling for the matches
        for ( const index in matches )
            process_arguments.push( matches[ index ].replaceAll( '-', '_' ).split( '=' ) )
        
        const obj = Object.fromEntries( process_arguments )
        const keys = Object.keys( obj )
        
        return new Promise( resolve => {
            resolve( { object:obj, keys:keys } )
        } )
    }
    
} )

export default processor[ processorSymbol ]
