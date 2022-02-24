export default String.prototype.magenta = function(){
    return `\u001b[35m${ this }\x1b[0m`
}
