import { koorieErrors, koorieErrorsSymbol } from './terminal.js'
import { serverErrors, serverErrorsSymbol } from './server.js'
import { shell_exit_codes, shellExitCodesSymbol } from './shell.js'

export const koorieErrors__ = koorieErrors[ koorieErrorsSymbol ]
export const shell_exit_codes__ = shell_exit_codes[ shellExitCodesSymbol ]
export const serverErrors__ = serverErrors[ serverErrorsSymbol ]
