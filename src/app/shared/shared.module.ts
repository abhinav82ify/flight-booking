import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlightDetailsBannerComponent } from './components/flight-details-banner/flight-details-banner.component';
import { MultiAirlineFlightDetailsBannerComponent } from './components/multi-airline-flight-details-banner/multi-airline-flight-details-banner.component';



@NgModule({
  declarations: [HeaderComponent, SearchBoxComponent, SearchResultsComponent, FlightDetailsBannerComponent, MultiAirlineFlightDetailsBannerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    SearchBoxComponent,
    SearchResultsComponent
  ]
})
export class SharedModule { }
