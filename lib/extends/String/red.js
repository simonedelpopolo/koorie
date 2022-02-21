export default String.prototype.red = function(){
    return `\x1b[31m${ this }\x1b[0m`
}
