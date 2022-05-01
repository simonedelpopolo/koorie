/**
 * Object [ input.promise ]
 *
 * @param {any} promise - returned
 * @returns {Promise<string|Error|undefined>|string|Error|undefined}
 */
export default function promise( promise ) {

    return new Promise( ( resolve, reject ) => {

        if( promise instanceof Error )
            reject( promise )

        else resolve( promise )
    } )
}
