var Pet = (function () {
    function Pet(basicfightPower, level) {
        this.basicfightPower = basicfightPower;
        this.level = level;
    }
    var d = __define,c=Pet,p=c.prototype;
    d(p, "FightPower"
        ,function () {
            return Math.pow(1.1, this.level) * this.basicfightPower;
        }
    );
    return Pet;
}());
egret.registerClass(Pet,'Pet');
//# sourceMappingURL=Pet.js.map