import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxComponent } from './search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoxComponent ],
      imports: [
        FormsModule, ReactiveFormsModule, SharedModule, HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
