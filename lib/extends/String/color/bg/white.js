export default String.prototype.bg_white = function(){
    return `\u001b[47m${ this }\x1b[0m`
}
