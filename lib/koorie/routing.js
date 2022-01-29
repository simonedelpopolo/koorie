import { logger } from '../../index.js'
import koorie from '../koorie.js'
import { outgoing, pushing__ } from './initialize.js'

export const routingSymbol = Symbol( 'the server routing system' )
export const routing = Object.defineProperty( koorie, routingSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,
    value: async function routing(){
        
        pushing__.once( 'error', log => {
            outgoing.end()
            logger( { quiet:false, info: [ log ] } )
        } )
        
        pushing__.once( 'read', resource => {
            outgoing.write( resource.buffer )
        } )
        
        pushing__.once( 'koorie', resource => {
            outgoing.write( resource.buffer )
        } )
    
        pushing__.once( 'api', log => {
            logger( { quiet:false, info:[ log ] } )
        } )
        
        pushing__.once( 'ready', log => {
            outgoing.end()
            logger( { quiet:false, info:[ log ] } )
        } )
    }
} )
