class Hero {
	isInTeam: boolean;
	equipments: Equipment[] = []; 
	level = 1;          
	Heroquality: number;            
	Starquality: number;         
	atkquality: number;
	hpquality: number;
	defquality: number;
	spdquality: number;
	critquality: number;
	constructor(isInTeam: boolean, Heroquality: number, Starquality: number,
		atkquality, hpquality: number, defquality: number, spdquality: number, critquality: number, level: number) {
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

	get atk() {
		return 100 + ((4 * this.atkquality) + (3 * this.Heroquality) + (12 * this.Starquality)) * this.level;
	}

	get hp() {
		return 400 + ((35 * this.hpquality) + (25 * this.Heroquality) + (45 * this.Starquality)) * this.level;
	}

	get def() {
		return 60 + ((1.3 * this.defquality) + (0.5 * this.Heroquality) + (1.5 * this.Starquality)) * this.level;
	}

	get spd() {
		return 90 + (this.spdquality * 8 + this.Heroquality * this.Starquality);
	}
	get crit() {
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

	get Equipmentattack() {                //得到装备攻击力
		var result = 0;
		this.equipments.forEach(e => result += e.attack);

		// console.log("Equipment:" + result);
		return result;
	}

	get fightPower() {                     //得到战斗力
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

	AddEquipment(equipment: Equipment) {
		this.equipments.push(equipment);
	}
}


enum HeroQuality {     //英雄品质
	N = 1.4,
	R = 1.6,
	SR = 1.8,
	SSR = 2.0
}
enum StarQuality {          //星级品质
	SIX = 2.8,
	FIFE = 2.0,
	FOUR = 1.5,
	THREE = 1.2,
	TWO = 1.0,
	ONE = 0.8
}
enum AttributeQuality {          //属性品质
	S = 2.8,
	A = 2.3,
	B = 1.8,
	C = 1.4,
	D = 1.0
}