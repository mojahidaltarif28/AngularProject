import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import{HousingService} from '../housing.service';
import {Housinglocation} from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article class="ar1">
    <img class="listing-photo" [src]="housingLocation?.photo">
    <section class="listing-description">
    <h3 class="listing-heading">{{housingLocation?.name}}</h3>
    <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
    <h2 class="section-heading">About this housing location</h2>
    <ul>
    <li>Units available: {{housingLocation?.availableUnits}}</li>
    <li> Does this location have laundry:{{housingLocation?.laundry}}</li>
    </ul>
    </section>
    <section class="listing-apply">
    <h2 class="section-heading">Apply now to live here</h2>
    <form [formGroup]="applyForm" (submit)="submitApplication()">
    <label for="firstName">First Name</label>
    <input type="text" id="first-Name" formControlName="firstName" />
    
    <label for="lastName">Last Name</label>
    <input type="text" id="last-Name" formControlName="lastName" />

    <label for="email">Email</label>
    <input type="email" id="email" formControlName="email" />
    <button class="primary">Apply now</button>
    </form>
    </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    housingService = inject(HousingService);
    housingLocation: Housinglocation|undefined;
    applyForm=new FormGroup({
    firstName:new FormControl(''),
    lastName:new FormControl(''),
    email:new FormControl('')
    });
    constructor() {
        const housingLocationId = Number(this.route.snapshot.params['id']);
        //this.housingLocation=this.housingService.getHousingLocation(housingLocationId);
        this.housingService.getHousingLocation(housingLocationId).then(housingLocation => {
            this.housingLocation = housingLocation;
        });
    }
    submitApplication(){
        this.housingService.submitApplication(
        this.applyForm.value.firstName??'',
        this.applyForm.value.lastName??'',
        this.applyForm.value.email??''
        );
    }
    }

