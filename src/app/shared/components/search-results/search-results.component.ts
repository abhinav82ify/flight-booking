import { Component, OnInit } from '@angular/core';

import { UnsubscribeOnDestroyAdapter } from '@/app/helpers/unsubscribe-on-destroy-adapter';
import { FlightSearchService } from '@/app/services/flight-search/flight-search.service';

@Component({
  selector: 'flb-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  constructor(private flightSearchService: FlightSearchService) {
    super();
  }

  private subscribeToFlightResultState() {
    this.subsink.push(
      this.flightSearchService.flightSearchResults$.subscribe(state => {
        console.log(state);
      })
    );
  }

  ngOnInit(): void {
    this.subscribeToFlightResultState();
  }

}
