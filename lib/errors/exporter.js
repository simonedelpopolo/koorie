import { serverErrors, serverErrorsSymbol } from './server.js'
import { terminalErrors, terminalErrorsSymbol } from './terminal.js'

export const koorieErrors__ = serverErrors[ serverErrorsSymbol ]
export const terminalErrors__ = terminalErrors[ terminalErrorsSymbol ]
