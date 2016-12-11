var Hero = (function () {
    function Hero(isInTeam, Heroquality, Starquality, atkquality, hpquality, defquality, spdquality, critquality, level) {
        this.equipments = [];
        this.level = 1;
        this.isInTeam = isInTeam;
        this.Heroquality = Heroquality;
        this.Starquality = Starquality;
        this.atkquality = atkquality;
        this.hpquality = hpquality;
        this.defquality = defquality;
        this.spdquality = spdquality;
        this.critquality = critquality;
        this.level = level;
    }
    var d = __define,c=Hero,p=c.prototype;
    d(p, "atk"
        ,function () {
            return 100 + ((4 * this.atkquality) + (3 * this.Heroquality) + (12 * this.Starquality)) * this.level;
        }
    );
    d(p, "hp"
        ,function () {
            return 400 + ((35 * this.hpquality) + (25 * this.Heroquality) + (45 * this.Starquality)) * this.level;
        }
    );
    d(p, "def"
        ,function () {
            return 60 + ((1.3 * this.defquality) + (0.5 * this.Heroquality) + (1.5 * this.Starquality)) * this.level;
        }
    );
    d(p, "spd"
        ,function () {
            return 90 + (this.spdquality * 8 + this.Heroquality * this.Starquality);
        }
    );
    d(p, "crit"
        ,function () {
            var result = 0;
            switch (this.spdquality) {
                case AttributeQuality.S:
                    result = 0.1;
                    break;
                case AttributeQuality.A:
                    result = 0.08;
                    break;
                case AttributeQuality.B:
                    result = 0.05;
                    break;
                default:
                    result = 0;
                    break;
            }
            return result;
        }
    );
    d(p, "Equipmentattack"
        ,function () {
            var result = 0;
            this.equipments.forEach(function (e) { return result += e.attack; });
            // console.log("Equipment:" + result);
            return result;
        }
    );
    d(p, "fightPower"
        ,function () {
            // console.log("atk:" + this.atk);
            // console.log("hp:" + this.hp);
            // console.log("def:" + this.def);
            // console.log("spd:" + this.spd);
            // console.log("crit:" + this.crit);
            // return this.atk * 0.5 + this.hp * 0.05 + this.def * 1.5 + this.spd * 1 + this.crit * 1000 + this.Equipmentattack * 0.2
            // 	+ this.Equipmentattack * 0.2;
            var result = (this.atk + this.Equipmentattack * 0.8) * 0.5 + this.hp * 0.05 + this.def * 1.5 + this.spd * 1 + this.crit * 1000;
            console.log("HeroFightingPower:" + result);
            return result;
        }
    );
    p.AddEquipment = function (equipment) {
        this.equipments.push(equipment);
    };
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var HeroQuality;
(function (HeroQuality) {
    HeroQuality[HeroQuality["N"] = 1.4] = "N";
    HeroQuality[HeroQuality["R"] = 1.6] = "R";
    HeroQuality[HeroQuality["SR"] = 1.8] = "SR";
    HeroQuality[HeroQuality["SSR"] = 2] = "SSR";
})(HeroQuality || (HeroQuality = {}));
var StarQuality;
(function (StarQuality) {
    StarQuality[StarQuality["SIX"] = 2.8] = "SIX";
    StarQuality[StarQuality["FIFE"] = 2] = "FIFE";
    StarQuality[StarQuality["FOUR"] = 1.5] = "FOUR";
    StarQuality[StarQuality["THREE"] = 1.2] = "THREE";
    StarQuality[StarQuality["TWO"] = 1] = "TWO";
    StarQuality[StarQuality["ONE"] = 0.8] = "ONE";
})(StarQuality || (StarQuality = {}));
var AttributeQuality;
(function (AttributeQuality) {
    AttributeQuality[AttributeQuality["S"] = 2.8] = "S";
    AttributeQuality[AttributeQuality["A"] = 2.3] = "A";
    AttributeQuality[AttributeQuality["B"] = 1.8] = "B";
    AttributeQuality[AttributeQuality["C"] = 1.4] = "C";
    AttributeQuality[AttributeQuality["D"] = 1] = "D";
})(AttributeQuality || (AttributeQuality = {}));
//# sourceMappingURL=Hero.js.map