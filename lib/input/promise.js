import input from '@cli-blaze/input/lib/input.js'

export default Object.defineProperties( input[ Symbol.for( 'input' ) ],
    {
        [ Symbol.for( 'input.promise' ) ]: {
            enumerable: true,
            writable: false,
            configurable: false,

            /**
             * Object [ input.promise ]
             *
             * @param {any} promise - returned
             * @returns {Promise<string|Error|undefined>|string|Error|undefined}
             */
            value: function promise( promise ) {

                return new Promise( ( resolve, reject ) => {

                    if( promise instanceof Error )
                        reject( promise )

                    else resolve( promise )
                } )
            }
        }
    }
)
