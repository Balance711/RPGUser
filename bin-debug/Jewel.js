var Jewel = (function () {
    function Jewel(level, basicattack) {
        this.level = level;
        this.basicattack = basicattack;
    }
    var d = __define,c=Jewel,p=c.prototype;
    d(p, "attack"
        ,function () {
            return 10 + this.basicattack * Math.pow(1.01, this.level);
        }
    );
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
//# sourceMappingURL=Jewel.js.map