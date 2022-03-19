import monitor from '../monitor.js'
import os from 'node:os'

const host_osSymbol = Symbol( 'Object [ monitor.host_os ]' )
const host_os = Object.defineProperty( monitor, host_osSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Get the host_os information - system.
     *
     * @returns {{arch: string, platform: NodeJS.Platform}}
     */
    value: function host_os() {

        return {
            arch: os.arch(),
            platform: os.platform()
        }
    }
} )

export default host_os[ host_osSymbol ]
