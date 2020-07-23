import { FlightSearchParams } from './flight-search-params';
import { convertDateStringToDate } from '../helpers/utility';

export interface FlightSearchResponse {
  arrivalTime: string;
  date: string;
  departureTime: string;
  destination: string;
  flightNo: string;
  name: string;
  origin: string;
  price: number;
}

export interface MultiFlightState {
  flight1: FlightSearchResponse;
  flight2: FlightSearchResponse;
}

export class FlightSearchResponse implements FlightSearchResponse {
  constructor() {}

  filter(params: FlightSearchParams, date: string): boolean {
    const inputDepartureDate = convertDateStringToDate(date);
    const thisDepartureDate = convertDateStringToDate(this.date);
    return (
      this.origin === params.origin &&
      this.destination === params.destination &&
      thisDepartureDate === inputDepartureDate
    );
  }
}
