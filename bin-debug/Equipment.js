var Equipment = (function () {
    function Equipment(level, basicattack) {
        this.jewels = [];
        this.level = level;
        this.basicattack = basicattack;
    }
    var d = __define,c=Equipment,p=c.prototype;
    d(p, "jewelsattack"
        ,function () {
            var result = 0;
            this.jewels.forEach(function (e) { return result += e.attack; });
            // console.log("jewel:" + result);
            return result;
        }
    );
    d(p, "attack"
        ,function () {
            return this.basicattack * Math.pow(1.05, this.level) + this.jewelsattack;
        }
    );
    p.Addjewel = function (jewel) {
        this.jewels.push(jewel);
    };
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
//# sourceMappingURL=Equipment.js.map