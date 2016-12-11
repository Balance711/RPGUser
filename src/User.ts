class User {

	level: number;

	pet: Pet;

	heroes: Hero[] = [];

	constructor(gold: number, level: number, pet: Pet) {
		this.level = level;
		this.pet = pet;
	}

	//基础属性写法
	// heroesInTeam:Hero[] = this.heroes.filter(hero => hero.isInTeam);//过滤器，过滤所有在队伍中的英雄isInteam

	//高阶属性写法
	@Cache
	get heroesInTeam() {
		return this.heroes.filter(hero => hero.isInTeam);//过滤器，过滤所有在队伍中的英雄isInteam
	}

	@Cache
	get FightPower(): number {
		var arr: Hero[] = [];
		var result = 0;
		this.heroesInTeam.map(hero => result += hero.fightPower);
		//map生成一个新的数组，把返回值生成一个新的数组（true true true false true false）
		//foreach
		//filter（）过滤器
		result += this.pet.FightPower;
		console.log("pet" + this.pet.FightPower);
		return result;
	}
	AddHero(hero: Hero) {
		this.heroes.push(hero);
	}

}