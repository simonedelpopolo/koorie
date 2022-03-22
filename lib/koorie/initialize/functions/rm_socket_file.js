import { constants } from 'fs'
import { access, rm } from 'node:fs'

/**
 * Remove, if exists, the socket file
 * It kills the process/es after
 * very red/sad message printed to stdout.
 *
 * @param {string} socket_path - path to the socket file.
 * @param {number} pid - the pid number of the process that received the SIGINT signal
 */
export function rm_socket_file( socket_path, pid ){
    process.stdout.write( '\r:('.red() )
    access( socket_path, constants.F_OK, error => {
        if( error )
            process.kill( pid )

        rm( socket_path, { force:true }, error => {

            if( error )
                process.kill( pid )

            process.kill( pid )
        } )
    } )

}
