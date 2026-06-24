import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDetails } from './place-details';

describe('PlaceDetails', () => {
  let component: PlaceDetails;
  let fixture: ComponentFixture<PlaceDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
