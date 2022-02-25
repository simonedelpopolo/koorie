import input from '../input.js'
import { options } from '../../index.js'
import { undefined_ } from 'oftypes'

export const socket_flagSymbol = Symbol( '--socket[-sk] type checking' )
export const socket_flag = Object.defineProperty( input, socket_flagSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    
    value: {
        
        get : async ( opts ) => {
            
            let flag
            const socket = {
                active: null,
                path: null
            }
            
            const resolvers = {
                
                true:() => {
                    
                    return undefined
                },
                false: async () => {
                    
                    let { active, path, error } = await options( opts.toString(), '--socket[-l]='.green().underline() )
                    
                    socket.active = active
                    socket.path = path
                    
                    return { socket:socket, error:error }
                }
            }
            
            flag = await  ( await undefined_( opts, resolvers ) )()
            
            
            return new Promise( ( resolve, reject ) => {
            
            
                resolve( flag )
            } )
        }
    }
} )

const internal_ = socket_flag[ socket_flagSymbol ]
