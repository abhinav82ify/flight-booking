import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailsBannerComponent } from './flight-details-banner.component';
import { SharedModule } from '@/app/shared/shared.module';

describe('FlightDetailsBannerComponent', () => {
  let component: FlightDetailsBannerComponent;
  let fixture: ComponentFixture<FlightDetailsBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlightDetailsBannerComponent],
      imports: [SharedModule],
    }).compileComponents();
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
