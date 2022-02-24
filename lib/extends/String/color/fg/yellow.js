export default String.prototype.yellow = function(){
    return `\u001b[33m${ this }\x1b[0m`
}
