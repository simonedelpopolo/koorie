import { addressFlag, addressFlagSymbol } from '../flags/address_flag.js'
import { arguments_, arguments_Symbol } from './arguments.js'
import { clusterFlag, clusterFlagSymbol } from '../flags/cluster_flag.js'
import { domainFlag, domainFlagSymbol } from '../flags/domain_flag.js'
import { initCommand, initCommandSymbol } from '../commands/init_command.js'
import { loggerFlag, loggerFlagSymbol } from '../flags/logger_flag.js'

// Koorie flags
const address_flag = addressFlag[ addressFlagSymbol ]
export const address_flag_get = address_flag.get

const cluster_flag = clusterFlag[ clusterFlagSymbol ]
export const cluster_flag_get = cluster_flag.get
export const cluster_flag_run = cluster_flag.run

const domain_flag = domainFlag[ domainFlagSymbol ]
export const domain_flag_get = domain_flag.get

const logger_flag = loggerFlag[ loggerFlagSymbol ]
export const logger_flag_get = logger_flag.get

// Koorie-Shell commands and flags

const shell_init = initCommand[ initCommandSymbol ]
export const init_command_get = shell_init.get

// Exported also into index.js
export const arguments__ = arguments_[ arguments_Symbol ]
