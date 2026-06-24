import { Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { PlaceStore } from '../../store/place-store';
import { map } from 'rxjs';
import { DatePipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { PlacePhotoPipe } from '../../pipes/place-photo-pipe';

@Component({
  selector: 'app-place-details',
  imports: [NgOptimizedImage, PlacePhotoPipe, DecimalPipe, DatePipe],
  templateUrl: './place-details.html',
  styleUrl: './place-details.css',
})
export class PlaceDetails {
  #activatedRoute = inject(ActivatedRoute);
  #place = inject(PlaceStore);

  placeDetails = this.#place.place;
  fetching = this.#place.fetching;
  placeId = toSignal(this.#activatedRoute.params.pipe(map((params) => params['id'])));
  activePhoto = linkedSignal(() => this.placeDetails()?.photos[0]);
  inWishList = linkedSignal(() => this.#place.inWishList(this.placeId()));

  placeIdRef = effect(() => {
    const placeId = this.placeId();

    this.#place.changePlaceId(placeId);
  });

  onAddToWishList() {
    const place = this.placeDetails();

    if (place) {
      this.#place.addToWishlist(place);
      this.inWishList.set(true);
    }
  }

  onRemoveFromWishList() {
    const place = this.placeDetails();

    if (place) {
      this.#place.removeFromWishlist(place);
      this.inWishList.set(false);
    }
  }
}
