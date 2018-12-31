if(!Array.prototype.includes) {
    console.log('Polyfill to Array.includes applied');
    Array.prototype.includes = function(elem) {
        return this.indexOf(elem) != -1;
    }
}