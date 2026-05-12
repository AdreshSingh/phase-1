import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
    <form >
    <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location 
    *ngFor="let housingLocation of filteredLocationList"
    [housingLocation]="housingLocation" />
  </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // static request by front-end
  // readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService)

  filteredLocationList: HousingLocationInfo[] = [];

  constructor() {

    //it using  static and synchronous code 🌟
    // this.housingLocationList = this.housingService.getAllHousingLocations();
    // this.filteredLocationList = this.housingLocationList;

    // //it using  dynamic and asynchronous code 🌟
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocationInfo[]) => {
      this.filteredLocationList = housingLocationList;
      this.housingLocationList = housingLocationList;
    })
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase()))
  }
}
