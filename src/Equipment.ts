class Equipment {   
	level: number;
	basicattack: number;
	jewels: Jewel[] = []; 
	constructor(level: number, basicattack: number) {
		this.level = level;
		this.basicattack = basicattack;
	}

	get jewelsattack() {            
		var result = 0;
		this.jewels.forEach(e => result += e.attack);
		// console.log("jewel:" + result);
		return result;
	}

	get attack() {
		return this.basicattack * Math.pow(1.05 , this.level) + this.jewelsattack;
	}
	Addjewel(jewel: Jewel) {
		this.jewels.push(jewel);
	}
}