import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceItem } from './place-item';

describe('PlaceItem', () => {
  let component: PlaceItem;
  let fixture: ComponentFixture<PlaceItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceItem],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
