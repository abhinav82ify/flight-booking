import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAirlineFlightDetailsBannerComponent } from './multi-airline-flight-details-banner.component';
import { SharedModule } from '@/app/shared/shared.module';

describe('MultiAirlineFlightDetailsBannerComponent', () => {
  let component: MultiAirlineFlightDetailsBannerComponent;
  let fixture: ComponentFixture<MultiAirlineFlightDetailsBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiAirlineFlightDetailsBannerComponent],
      imports: [SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiAirlineFlightDetailsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
