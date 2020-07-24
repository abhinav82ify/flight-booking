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

export class FlightSearchResponse implements FlightSearchResponse {
  constructor() {
    this.arrivalTime = '';
    this.date = '';
    this.departureTime = '';
    this.destination = '';
    this.flightNo = '';
    this.name = '';
    this.origin = '';
    this.price = 100000;
  }

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

export interface MultiFlightState {
  flight1: FlightSearchResponse;
  flight2: FlightSearchResponse;
}

export class MultiFlightState implements MultiFlightState {
  constructor() {
    this.flight1 = new FlightSearchResponse();
    this.flight2 = new FlightSearchResponse();
  }
}