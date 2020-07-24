import { Component, OnInit, Input } from '@angular/core';
import { MultiFlightState, FlightSearchResponse } from '@/app/models/flight-search-response';
import { dateAndTimeToDateObject, calculateDuration } from '@/app/helpers/utility';

@Component({
  selector: 'flb-multi-airline-flight-details-banner',
  templateUrl: './multi-airline-flight-details-banner.component.html',
  styleUrls: ['./multi-airline-flight-details-banner.component.scss']
})
export class MultiAirlineFlightDetailsBannerComponent implements OnInit {
  @Input() multiAirlineFlights: MultiFlightState;
  @Input() passengerCount: number;

  flight1: FlightSearchResponse;
  flight2: FlightSearchResponse;

  departureTime: string;
  arrivalTime: string;
  totalDuration: string;

  duration1: string;
  duration2: string;
  layoverTime: string;

  isDetailsOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.flight1 = this.multiAirlineFlights.flight1;
    this.flight2 =  this.multiAirlineFlights.flight2;

    this.departureTime = this.flight1.departureTime;
    this.arrivalTime = this.flight2.arrivalTime;

    const flight1DepartureTime = dateAndTimeToDateObject(this.flight1.date, this.flight1.departureTime);
    const flight1ArrivalTime = dateAndTimeToDateObject(this.flight1.date, this.flight1.arrivalTime);
    const flight2DepartureTime = dateAndTimeToDateObject(this.flight2.date, this.flight2.departureTime);
    const flight2ArrivalTime = dateAndTimeToDateObject(this.flight2.date, this.flight2.arrivalTime);

    
    this.totalDuration = calculateDuration(flight2ArrivalTime, flight1DepartureTime);
    this.duration1 = calculateDuration(flight1ArrivalTime, flight1DepartureTime);
    this.duration2 = calculateDuration(flight2ArrivalTime, flight2DepartureTime);
    this.layoverTime = calculateDuration(flight2DepartureTime, flight1ArrivalTime);
  }

  toggleDetails() {
    this.isDetailsOpen = !this.isDetailsOpen;
  }

  get totalFare() {
    return (this.flight1.price + this.flight2.price) * this.passengerCount;
  }

}
