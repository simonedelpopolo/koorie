/**
 * API memory.
 *
 * @param {number=} refresh_rate - specify the refresh rate in milliseconds
 */
import { memorySymbol, memory as obj } from '../../../monitor/memory.js'

/**
 * @param refresh_rate
 */
export function memory( refresh_rate= 1_000 ){
    return obj[ memorySymbol ]( refresh_rate )
}
