export default String.prototype.blue = function () {
    return `\u001b[34m${this}\x1b[0m`
}
