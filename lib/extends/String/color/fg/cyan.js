export default String.prototype.cyan = function(){
    return `\u001b[36m${ this }\x1b[0m`
}
