import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@/app/helpers/unsubscribe-on-destroy-adapter';
import {
  FlightResultState,
  FlightSearchService,
} from '@/app/services/flight-search/flight-search.service';
import { convertDateStringToDate } from '@/app/helpers/utility';
import {
  FlightSearchResponse,
  MultiFlightState,
} from '@/app/models/flight-search-response';

@Component({
  selector: 'flb-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  private flightSearchState: FlightResultState;

  origin: string;
  destination: string;
  departureDate: Date;
  returnDate: Date;

  oneWayDirectFlights: FlightSearchResponse[] = [];
  oneWayMultiAirlineFlights: MultiFlightState[] = [];
  returnDirectFlights: FlightSearchResponse[] = [];
  returnMultiAirlineFlights: MultiFlightState[] = [];

  constructor(private flightSearchService: FlightSearchService) {
    super();
  }

  private subscribeToFlightResultState() {
    this.subsink.push(
      this.flightSearchService.flightSearchResults$.subscribe((state) => {
        this.flightSearchState = { ...state };
        if (!state.isDataLoading && state.oneWayDirectFlights.length > 0) {
          this.origin = state.oneWayDirectFlights[0].origin;
          this.destination = state.oneWayDirectFlights[0].destination;
          this.departureDate = convertDateStringToDate(
            state.oneWayDirectFlights[0].date
          );

          this.oneWayDirectFlights = this.flightSearchState.oneWayDirectFlights.filter(
            (flight) => flight.price <= this.maxPrice
          );
          this.oneWayMultiAirlineFlights = this.flightSearchState.oneWayMultipleFlights.filter(
            (flights) =>
              flights.flight1.price + flights.flight2.price <= this.maxPrice
          );

          if (
            state.searchParams?.flightMode === '2' &&
            state.returnDirectFlights.length > 0
          ) {
            this.returnDate = convertDateStringToDate(
              state.returnDirectFlights[0].date
            );
            this.returnDirectFlights = this.flightSearchState.returnDirectFlights.filter(
              (flight) => flight.price <= this.maxPrice
            );
            this.returnMultiAirlineFlights = this.flightSearchState.returnMultipleFlights.filter(
              (flights) =>
                flights.flight1.price + flights.flight2.price <= this.maxPrice
            );
          }
        }
      })
    );
  }

  ngOnInit(): void {
    this.subscribeToFlightResultState();
  }

  get isReturnJourney() {
    return this.flightSearchState.searchParams?.flightMode === '2';
  }

  get isFlightSearchDone() {
    return !!this.flightSearchState.searchParams;
  }

  get hasResults() {
    return (
      !!this.flightSearchState.searchParams &&
      (this.flightSearchState.oneWayDirectFlights.length > 0 ||
        this.flightSearchState.oneWayMultipleFlights.length > 0)
    );
  }

  get isDataLoading() {
    return this.flightSearchState.isDataLoading;
  }

  get passengerCount() {
    return !this.flightSearchState.isDataLoading &&
      this.flightSearchState.searchParams
      ? this.flightSearchState.searchParams.passengerCount
      : 1;
  }

  get maxPrice() {
    return !this.flightSearchState.isDataLoading &&
      this.flightSearchState.searchParams
      ? this.flightSearchState.searchParams.maxPrice
      : 100000;
  }
}
