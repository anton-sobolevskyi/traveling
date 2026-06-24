import { Component, input } from '@angular/core';
import { Place } from '../../models/place';
import { PlaceItem } from '../place-item/place-item';

@Component({
  selector: 'app-place-list',
  imports: [PlaceItem],
  templateUrl: './place-list.html',
  styleUrl: './place-list.css',
})
export class PlaceList {
  readonly places = input.required<Place[]>();
}
