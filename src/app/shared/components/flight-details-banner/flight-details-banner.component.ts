import { Component, OnInit, Input } from '@angular/core';
import { FlightSearchResponse } from '@/app/models/flight-search-response';

import { dateAndTimeToDateObject, calculateDuration } from '@/app/helpers/utility';

@Component({
  selector: 'flb-flight-details-banner',
  templateUrl: './flight-details-banner.component.html',
  styleUrls: ['./flight-details-banner.component.scss']
})
export class FlightDetailsBannerComponent implements OnInit {
  @Input() flightDetails: FlightSearchResponse = new FlightSearchResponse();
  @Input() passengerCount: number;
  
  constructor() { }

  ngOnInit(): void {
    
  }

  get duration() {
    const departureTime = dateAndTimeToDateObject(this.flightDetails.date, this.flightDetails.departureTime);
    const arrivalTime = dateAndTimeToDateObject(this.flightDetails.date, this.flightDetails.arrivalTime);

    return calculateDuration(arrivalTime, departureTime);
  }

  get totalFare() {
    return this.flightDetails.price * this.passengerCount;
  }

}
