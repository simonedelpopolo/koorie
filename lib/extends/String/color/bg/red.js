export default String.prototype.bg_red = function(){
    return `\x1b[41m${ this }\x1b[0m`
}
