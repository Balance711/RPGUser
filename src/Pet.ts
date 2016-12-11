class Pet {             //宠物
	basicfightPower: number;
	level: number;

	constructor(basicfightPower: number, level: number) {
		this.basicfightPower = basicfightPower;
		this.level = level;
	}
	get FightPower(): number {
		return Math.pow(1.1, this.level) * this.basicfightPower;
	}
}