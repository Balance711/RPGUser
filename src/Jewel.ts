class Jewel {
	level: number;
	basicattack: number;
	constructor(level: number, basicattack: number) {
		this.level = level;
		this.basicattack = basicattack;
	}
	get attack() {
		return 10 + this.basicattack * Math.pow(1.01,this.level);
	}
}