export default String.prototype.white = function(){
    return `\u001b[37m${ this }\x1b[0m`
}
