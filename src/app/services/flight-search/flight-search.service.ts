import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { FlightSearchParams } from '../../models/flight-search-params';
import { FlightSearchResponse, MultiFlightState } from '../../models/flight-search-response';

import { convertDateStringToDate, dateAndTimeToDateObject, differenceInMinutes } from '../../helpers/utility';

export interface FlightResultState {
  oneWayDirectFlights: FlightSearchResponse[];
  oneWayMultipleFlights: MultiFlightState[];
  returnDirectFlights: FlightSearchResponse[];
  returnMultipleFlights: MultiFlightState[];
  flightMode: string;
  isDataLoading: boolean;
};

const initialState: FlightResultState = {
  oneWayDirectFlights: [],
  oneWayMultipleFlights: [],
  returnDirectFlights: [],
  returnMultipleFlights: [],
  flightMode: '1',
  isDataLoading: false
}

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  private flightSearchUrl: string = 'http://tw-frontenders.firebaseio.com/advFlightSearch.json';

  private flightSearchResults: BehaviorSubject<FlightResultState> = new BehaviorSubject<FlightResultState>(initialState);
  private allFlights: FlightSearchResponse[] = [];

  flightSearchResults$: Observable<FlightResultState> = this.flightSearchResults.asObservable();

  constructor(private _http: HttpClient) { }

  async searchFlights(params: FlightSearchParams) {
    let oneWayResponse =  { direct:[], multi: [] };
    let twoWayResponse = { direct:[], multi: [] };
    this.streamData(oneWayResponse, twoWayResponse, params.flightMode, true);

    this.allFlights = await this._http.get<FlightSearchResponse[]>(this.flightSearchUrl).toPromise();
    
    oneWayResponse = this.filterFlights(params.origin, params.destination, params.departureDate);
    if(params.flightMode === '2') {
      twoWayResponse = this.filterFlights(params.destination, params.origin, params.returnDate);
    }

    this.streamData(oneWayResponse, twoWayResponse, params.flightMode, false);
  }

  private streamData(oneWayResponse, twoWayResponse, flightMode, isDataLoading) {
    this.flightSearchResults.next({
      oneWayDirectFlights: oneWayResponse.direct,
      oneWayMultipleFlights: oneWayResponse.multi,
      returnDirectFlights: twoWayResponse.direct,
      returnMultipleFlights: twoWayResponse.multi,
      flightMode,
      isDataLoading
    });
  }

  private filterFlights(origin: string, destination: string, date) {
    let flightsFromOrigin = [];
    let flightsToDestination = [];
    const directFlights = this.allFlights.filter(flight => {
      const response = this.filterDirectFlight(flight, origin, destination, date);
      if(!response) {
        if(flight.origin === origin) {
          flightsFromOrigin.push({ ...flight });
        }
        if(flight.destination === destination) {
          flightsToDestination.push({ ...flight });
        }
      }
      return response;
    });
    const multiAirlineFlights = this.mergeMultiAirlineFlights(flightsFromOrigin, flightsToDestination);

    return {
      direct: directFlights,
      multi: multiAirlineFlights
    };
  }

  private filterDirectFlight(flight: FlightSearchResponse, origin: string, destination: string, date: string): boolean {
    const inputDepartureDate = convertDateStringToDate(date);
    const thisDepartureDate = convertDateStringToDate(flight.date);
    return (
      flight.origin === origin &&
      flight.destination === destination &&
      thisDepartureDate.getTime() === inputDepartureDate.getTime()
    );
  }

  private mergeMultiAirlineFlights(flightsFromOrigin: FlightSearchResponse[], flightsToDestination: FlightSearchResponse[]) {
    let multiAirlineFlights = [];

    flightsFromOrigin.forEach(originFlight => {
      flightsToDestination.forEach(destinationFlight => {
        if(destinationFlight.origin === originFlight.destination) {
          const destinationFlightDepartureTime = dateAndTimeToDateObject(destinationFlight.date, destinationFlight.departureTime);
          const originFlightArrivalTime = dateAndTimeToDateObject(originFlight.date, originFlight.arrivalTime);
          const diff = differenceInMinutes(destinationFlightDepartureTime, originFlightArrivalTime);
          if(diff >= 30) {
            multiAirlineFlights.push({
              flight1: { ...originFlight },
              flight2: { ...destinationFlight }
            });
          }
        }
      })
    });

    return multiAirlineFlights;
  }
 
}
