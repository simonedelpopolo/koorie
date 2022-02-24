export default String.prototype.bg_green = function(){
    return `\x1b[42m${ this }\x1b[0m`
}
