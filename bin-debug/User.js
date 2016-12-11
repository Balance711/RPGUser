var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var User = (function () {
    function User(gold, level, pet) {
        this.heroes = [];
        this.level = level;
        this.pet = pet;
    }
    var d = __define,c=User,p=c.prototype;
    d(p, "heroesInTeam"
        //基础属性写法
        // heroesInTeam:Hero[] = this.heroes.filter(hero => hero.isInTeam);//过滤器，过滤所有在队伍中的英雄isInteam
        //高阶属性写法
        ,function () {
            return this.heroes.filter(function (hero) { return hero.isInTeam; }); //过滤器，过滤所有在队伍中的英雄isInteam
        }
    );
    d(p, "FightPower"
        ,function () {
            var arr = [];
            var result = 0;
            this.heroesInTeam.map(function (hero) { return result += hero.fightPower; });
            //map生成一个新的数组，把返回值生成一个新的数组（true true true false true false）
            //foreach
            //filter（）过滤器
            result += this.pet.FightPower;
            console.log("pet" + this.pet.FightPower);
            return result;
        }
    );
    p.AddHero = function (hero) {
        this.heroes.push(hero);
    };
    __decorate([
        Cache
    ], p, "heroesInTeam", null);
    __decorate([
        Cache
    ], p, "FightPower", null);
    return User;
}());
egret.registerClass(User,'User');
//# sourceMappingURL=User.js.map