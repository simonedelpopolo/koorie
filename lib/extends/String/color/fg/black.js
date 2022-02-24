export default String.prototype.black = function(){
    return `\u001b[30m${ this }\x1b[0m`
}
