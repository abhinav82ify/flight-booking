import { Component, OnInit, Input } from '@angular/core';

import { FlightSearchResponse, MultiFlightState } from '@/app/models/flight-search-response';

@Component({
  selector: 'flb-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  @Input() origin: string;
  @Input() destination: string;
  @Input() directFlights: FlightSearchResponse[] = [];
  @Input() multiAirlineFlights: MultiFlightState[] = [];
  @Input() date: Date;
  @Input() passengerCount: number;

  constructor() {
  }

  ngOnInit() {

  }

}
