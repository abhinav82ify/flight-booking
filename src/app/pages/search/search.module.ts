import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { FlightSearchComponent } from './flight-search/flight-search.component';

const routes: Routes = [{ path: '', component: FlightSearchComponent }];

@NgModule({
  declarations: [FlightSearchComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class SearchModule {}
