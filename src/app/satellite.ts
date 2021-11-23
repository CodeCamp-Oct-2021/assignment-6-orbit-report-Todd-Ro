export class Satellite {

	name: string;
	type: string;
	launchDate: string;
	orbitType: string;
	operational: boolean;
	isDebris: boolean;

	constructor(name: string, type: string, launchDate: string, orbitType: string, operational: boolean) {
		this.name = name;
		this.type = type;
		this.launchDate = launchDate;
		this.orbitType = orbitType;
		this.operational = operational;
		this.isDebris = this.isSpaceDebris();
   }
	
	isSpaceDebris(): boolean {
		if (this.type == 'Space Debris') {
			//console.log(`${this.name} is space debris.`);
			return true;
		} else {
			return false;
		}
   }

}

// TODO 3a: fix isSpaceDebris check
