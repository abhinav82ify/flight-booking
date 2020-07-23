import { Injectable } from '@angular/core';
import { City } from '../../models/city';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  
  private cities: City[] = [
    new City('Pune', 'PNQ'),
    new City('Mumbai', 'BOM'),
    new City('Bengaluru', 'BLR'),
    new City('Delhi','DEL')
  ];

  constructor() { }

  getCities(searchItem): Observable<City[]> {
    return of(this.cities.filter(city => city.contains(searchItem)));
  }

  searchCities(searchItem): string[] {
    const filteredCities: string[] = this.cities.filter(city => city.contains(searchItem)).map(city => `${city.name} (${city.code})`);
    return filteredCities
  }
}
