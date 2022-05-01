import os from 'node:os'

/**
 * Get the host_os information - system.
 *
 * @returns {{arch: string, platform: NodeJS.Platform}}
 */
export default function host_os() {

    return {
        arch: os.arch(),
        platform: os.platform()
    }
}
