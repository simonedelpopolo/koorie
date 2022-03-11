export default String.prototype.bg_blue = function () {
    return `\u001b[44m${this}\x1b[0m`
}
