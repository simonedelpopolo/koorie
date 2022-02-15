import { address_flag, address_flagSymbol } from './address_flag.js'
import { cluster_flag, cluster_flagSymbol } from './cluster_flag.js'
import { domain_flag, domain_flagSymbol } from './domain_flag.js'
import { entry_point, entry_pointSymbol } from './entry_point.js'
import { init_command, init_commandSymbol } from './init_command.js'
import { loggerFlag, loggerFlagSymbol } from './logger_flag.js'
import { process_title, process_titleSymbol } from './process_title.js'

// Koorie flags
const address_flag__ = address_flag[ address_flagSymbol ]
export const address_flag_get = address_flag__.get

const cluster_flag__ = cluster_flag[ cluster_flagSymbol ]
export const cluster_flag_get = cluster_flag__.get
export const cluster_flag_run = cluster_flag__.run

const domain_flag__ = domain_flag[ domain_flagSymbol ]
export const domain_flag_get = domain_flag__.get

const logger_flag__ = loggerFlag[ loggerFlagSymbol ]
export const logger_flag_get = logger_flag__.get

// Koorie-Shell commands and flags

const shell_init = init_command[ init_commandSymbol ]
export const init_command_get = shell_init.get


export const process_title__ = process_title[ process_titleSymbol ]
export const entry_point__ = entry_point[ entry_pointSymbol ]
