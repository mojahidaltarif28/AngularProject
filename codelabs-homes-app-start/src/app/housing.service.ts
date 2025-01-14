import { Injectable } from '@angular/core';
import {Housinglocation} from './housinglocation'

@Injectable({
  providedIn: 'root'
})
export class HousingService {
    //readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
    //  protected housingLocationList: Housinglocation[]=[
    //  ] ;
    url = 'http://localhost:5253/api/home/HouseDetails';

  constructor() {}
  //getAllHousingLocations(): Housinglocation[] {
  //return this.housingLocationList;
    //}
    async getAllHousingLocations(): Promise<Housinglocation[]> {
        const data = await fetch(this.url);
        return await data.json()?? [];
    }
  //getHousingLocation(id: number): Housinglocation|undefined {
  //    return this.housingLocationList.find(housingLocation=> housingLocation.id===id);
    //}
    async getHousingLocation(id: number): Promise<Housinglocation | undefined> {
        const data = await fetch(`${this.url}?id=${id}`); 
        const locations = await data.json(); 
        return locations.find((location: Housinglocation) => location.id === id);
    }
  submitApplication(firstName: string, lastName: string, email: string){
        console.log('Application submitted', {firstName, lastName, email});
    }
}
