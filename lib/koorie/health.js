import koorie from '../koorie.js'
import { Answer, host_os, os_uptime } from '../../index.js'

const healthSymbol = Symbol( 'Object [ koorie.health ]' )
const health = Object.defineProperty( koorie, healthSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Route - health.
     *
     * @param {IncomingMessage} incoming - The given IncomingMessage Object.
     * @param {ServerResponse} outgoing - The given ServerResponse Object.
     * @returns {Promise<{buffer:Buffer}> | {buffer:Buffer}}
     */
    value: async function health( incoming, outgoing ) {

        const health_key = await Answer.toGet( await Answer.getQuestion( 'params' ), process.env.HEALTH_KEY )
        let system = false

        let pass = true
        if( incoming.method !== 'GET' )
            pass = false

        else{
            if( !health_key.has( 'key' ) )
                pass = false
            else {
                if ( health_key.get( 'key' ) !== process.env.HEALTH_KEY )
                    pass = false
                else{

                    system = {
                        system: {
                            arch: host_os().arch,
                            platform: host_os().platform,
                            uptime: os_uptime()
                        },
                        koorie:{
                            version: process.env.npm_package_version
                        }
                    }
                }
            }
        }

        return new Answer( ( good, bad ) => {

            if( !pass ) {
                outgoing.statusCode = 500
                outgoing.statusMessage = 'who are you? kO'
                bad( 'no talk to strangers'.toBuffer() )
            }else {

                outgoing.statusCode = 200
                outgoing.statusMessage = 'oK'
                good( JSON.stringify( system ).toBuffer() )
            }
        } )
    }
} )

export default health[ healthSymbol ]
