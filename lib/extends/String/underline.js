export default String.prototype.underline = function(){
    return `\u001b[4m${ this }\x1b[0m`
}
