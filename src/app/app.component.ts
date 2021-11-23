import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';

  sourceList: Satellite[];
  displayList: Satellite[];
  typesList: string[];
  typeCounts: number[];
  allTotal: number;

	constructor() {
		this.sourceList = [];
		this.displayList = [];
		this.typesList = [];
		this.typeCounts = [];
		this.allTotal = 0;
		let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

		window.fetch(satellitesUrl).then(function (response) {
			response.json().then(function (data) {

				let fetchedSatellites = data.satellites;
				// loop over satellites
				let ind: number;
				for(let i=0; i < fetchedSatellites.length; i++) {
					// create a Satellite object 
					let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
					// add the new Satellite object to sourceList 
					this.sourceList.push(satellite);
					if ( !this.typesList.includes(fetchedSatellites[i].type) ) {
						this.typesList.push(fetchedSatellites[i].type);
						this.typeCounts.push(1);
						this.allTotal++;
				 	}
					 else {
						ind = this.typesList.indexOf(fetchedSatellites[i].type);
						this.typeCounts[ind] += 1;
						this.allTotal++;
					 }
				}
				//console.log(this.typesList);
				//console.log(this.typeCounts);
				 // make a copy of the sourceList to be shown to the user
				 this.displayList = this.sourceList.slice(0);
	  
			}.bind(this));
		}.bind(this));

	}

	search(searchTerm: string): void {
		let matchingSatellites: Satellite[] = [];
		let typeCounters: number[] = [];
		for(let j=0; j<this.typesList.length; j++) {
			typeCounters.push(0);
		}
		//console.log(typeCounters);
		searchTerm = searchTerm.toLowerCase();
		this.allTotal = 0;
		for(let i=0; i < this.sourceList.length; i++) {
			let currentType: string;
			let name = this.sourceList[i].name.toLowerCase();
			let indy: number;
			if (name.indexOf(searchTerm) >= 0) {
				matchingSatellites.push(this.sourceList[i]);
				currentType = this.sourceList[i].type;
				indy = this.typesList.indexOf(currentType);
				typeCounters[indy]++;
				this.allTotal++;
			}
		}
		// assign this.displayList to be the array of matching satellites
		// this will cause Angular to re-make the table, but now only containing matches
		this.displayList = matchingSatellites;
		this.typeCounts = typeCounters;
	}


}
