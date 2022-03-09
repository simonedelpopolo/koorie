import shell from '../shell.js'

export const routeSymbol = Symbol( 'koorie shell routes management' )
export const route = Object.defineProperty( shell, routeSymbol, {
    enumerable:true,
    writable:false,
    configurable: false,

    value : async function route( options ){}
} )
