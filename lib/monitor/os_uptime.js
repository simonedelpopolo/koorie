import monitor from '../monitor.js'
import os from 'node:os'

const os_uptimeSymbol = Symbol( 'Object [ monitor.os_uptime ]' )
const os_uptime = Object.defineProperty( monitor, os_uptimeSymbol, {
    enumerable: true,
    writable: false,
    configurable: false,

    /**
     * Get the os_uptime statistic - system.
     *
     * @returns {string}
     */
    value: function os_uptime() {

        let ut_sec = Math.floor( os.uptime() )
        let ut_min = Math.floor( ut_sec / 60 )
        let ut_hour = Math.floor( ut_min / 60 )

        let hours = ut_hour%60
        let minutes = ut_min%60
        let seconds = ut_sec%60

        return `${hours}h-${minutes}m-${seconds}s`
    }
} )

export default os_uptime[ os_uptimeSymbol ]
