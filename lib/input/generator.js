import input from '@cli-blaze/input/lib/input.js'

export default Object.defineProperties( input[ Symbol.for( 'input' ) ],
    {
        [ Symbol.for( 'input.generator' ) ]: {
            enumerable: true,
            writable: false,
            configurable: false,

            /**
             * Object [ input.generator ]
             * type check for flag.
             *
             * @param {any} logic - check
             * @yields
             * @returns {AsyncGenerator<any, Error, *>}
             */
            value: async function* generator( logic ) {
                for ( const routine of logic.routine )
                    yield routine( logic.flag )
            }
        }
    }
)
