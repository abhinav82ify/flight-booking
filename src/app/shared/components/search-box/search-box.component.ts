import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CitiesService } from '@/app/services/cities/cities.service';
import { FlightSearchParams } from '@/app/models/flight-search-params';
import { FlightSearchService } from '@/app/services/flight-search/flight-search.service';
@Component({
  selector: 'flb-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private citiesService: CitiesService,
    private flightSearchService: FlightSearchService
  ) {}

  private returnDateValidator = (control: FormControl) => {
    if (!control.value && this.searchForm?.controls?.flightMode.value === '2') {
      return { required: true };
    }
    return {};
  };

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      flightMode: new FormControl('1', Validators.required),
      origin: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      departureDate: new FormControl(null, Validators.required),
      returnDate: new FormControl(null, this.returnDateValidator),
      passengerCount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  submit() {
    for (const key in this.searchFormControls) {
      this.searchForm.controls[key].markAsDirty();
      this.searchForm.controls[key].updateValueAndValidity();
    }

    if (this.searchForm.valid) {
      let searchParams: FlightSearchParams = {
        flightMode: this.selectedFlightModeValue,
        origin: this.origin.value,
        destination: this.destination.value,
        departureDate: `${this.departureDate.value.year}/${this.departureDate.value.month}/${this.departureDate.value.day}`,
        returnDate: this.returnDate.value ? `${this.returnDate.value.year}/${this.returnDate.value.month}/${this.returnDate.value.day}` : '',
        passengerCount: this.passengerCount.value
      }

      // console.log(searchParams);
      this.flightSearchService.searchFlights(searchParams);

    }
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.citiesService.searchCities(term).slice(0, 10)
      )
    );

  get searchFormControls() {
    return this.searchForm.controls;
  }

  get origin() {
    return this.searchFormControls.origin;
  }

  get destination() {
    return this.searchFormControls.destination;
  }

  get departureDate() {
    return this.searchFormControls.departureDate;
  }

  get returnDate() {
    return this.searchFormControls.returnDate;
  }

  get passengerCount() {
    return this.searchFormControls.passengerCount;
  }

  get selectedFlightModeValue() {
    return this.searchFormControls.flightMode.value;
  }
}
