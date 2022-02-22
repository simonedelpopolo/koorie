import koorie from '../koorie.js'
import { read__ } from '../exporter.js'

export const librarySymbol = Symbol( 'Object [ koorie.library ] switcher for javascript library to serve' )
export const library = Object.defineProperty( koorie, librarySymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    /**
     * Switcher function for different javascript library to be served with koorie.
     * ReactJS, SolidJS and others soon.
     *
     * @param {string} name - The process.env.LIBRARY value will be the switcher.
     * @param {{filename:string, public_path:string}} resources - The requested resource from the browser.
     * @returns {Promise<boolean|Buffer|Error>}
     */
    value: async function library( name, resources ){
        
        if ( name === 'false' )
            return read__( resources )
        
        switch ( name ) {
    
            case 'react':
                
                return read__( resources )
            
            case 'solid':
                return read__( resources )
            
            case 'static':
                return read__( resources )
            
            default:
                
                return false
                
        }
        
    }
} )
