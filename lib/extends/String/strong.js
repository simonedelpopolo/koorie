export default String.prototype.strong = function(){
    return `\u001b[1m${ this }\x1b[0m`
}
