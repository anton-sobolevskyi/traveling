import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Place } from '../../models/place';
import { PlacePhotoPipe } from '../../pipes/place-photo-pipe';

@Component({
  selector: 'app-place-item',
  imports: [NgOptimizedImage, RouterLink, PlacePhotoPipe],
  templateUrl: './place-item.html',
  styleUrl: './place-item.css',
})
export class PlaceItem {
  place = input.required<Place>();
}
