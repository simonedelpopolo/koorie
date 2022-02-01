import koorie from '../koorie.js'

let absolute_path
export const resourceSymbol = Symbol( 'public static file absolute path' )
export const resource = Object.defineProperty( koorie, resourceSymbol, {
    enumerable: true,
    set( directory ){
        absolute_path = `${process.cwd()}/${ directory }`
    },
    get(){
        return absolute_path
    }
} )
