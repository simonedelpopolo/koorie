export default String.prototype.toBuffer = function(){
    return Buffer.from( this )
}
