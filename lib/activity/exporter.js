import { exit, exitSymbol } from './exit.js'
import { stderr, stderrSymbol } from './stderr.js'

export const process_exit_ = exit[ exitSymbol ]
export const stderr_ = stderr[ stderrSymbol ]
