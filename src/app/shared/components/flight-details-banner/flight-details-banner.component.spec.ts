import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailsBannerComponent } from './flight-details-banner.component';

describe('FlightDetailsBannerComponent', () => {
  let component: FlightDetailsBannerComponent;
  let fixture: ComponentFixture<FlightDetailsBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightDetailsBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDetailsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
