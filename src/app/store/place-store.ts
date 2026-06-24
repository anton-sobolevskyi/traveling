import { effect, inject, Service, signal } from '@angular/core';
import { Api } from '../services/api';
import { combineLatest, finalize, Subject, takeUntil } from 'rxjs';
import { Place } from '../models/place';
import { Storage } from './storage';
import { DEFAULT_LOCATION } from '../constants';

@Service()
export class PlaceStore {
  #api = inject(Api);
  #storage = inject(Storage);

  readonly abortRequest = new Subject<void>();

  readonly #places = signal<Place[]>([]);
  readonly #placeId = signal<string>('');
  readonly #place = signal<Place | undefined>(undefined);
  readonly #query = signal('');
  readonly #location = signal(DEFAULT_LOCATION);
  readonly #fetching = signal(false);
  readonly #wishlist = signal<Place[]>(this.#storage.getItem<Place[]>('wishlist') || []);

  readonly places = this.#places.asReadonly();
  readonly fetching = this.#fetching.asReadonly();
  readonly place = this.#place.asReadonly();
  readonly wishlist = this.#wishlist.asReadonly();

  changeRef = effect(() => {
    const query = this.#query();
    const location = this.#location();

    if (!query) {
      return this.#places.set([]);
    }

    this.abortRequest.next();

    this.#fetching.set(true);

    this.#api
      .getPlaces({
        query,
        ...location,
      })
      .pipe(
        finalize(() => this.#fetching.set(false)),
        takeUntil(this.abortRequest),
      )
      .subscribe((places) => {
        this.#places.set(places.places);
      });
  });

  placeRef = effect(() => {
    const placeId = this.#placeId();

    if (!placeId) {
      return this.#place.set(undefined);
    }

    this.abortRequest.next();

    this.#fetching.set(true);

    const place$ = this.#api.getPlaceById(placeId);

    combineLatest({
      place: place$,
    })
      .pipe(
        finalize(() => this.#fetching.set(false)),
        takeUntil(this.abortRequest),
      )
      .subscribe(({ place }) => {
        this.#place.set(place);
      });
  });

  changeQuery(query: string): void {
    this.#query.set(query);
  }

  changePlaceId(placeid: string): void {
    this.#placeId.set(placeid);
  }

  changeLocation(location: { longitude: number; latitude: number }) {
    this.#location.set(location);

    console.log(location);
  }

  inWishList(placeId: string): boolean {
    const wishlist = this.#storage.getItem<Place[]>('wishlist') || [];

    return wishlist.some((el) => el.id === placeId);
  }

  addToWishlist(place: Place) {
    const wishlist = this.#storage.getItem<Place[]>('wishlist') || [];

    if (wishlist.some((el) => el.id === place.id)) {
      return;
    }

    wishlist.push(place);
    this.#wishlist.set(wishlist);

    this.#storage.setItem('wishlist', wishlist);
  }

  removeFromWishlist(place: Place) {
    const wishlist = this.#storage.getItem<Place[]>('wishlist') || [];

    if (wishlist.some((el) => el.id === place.id)) {
      const newWishlist = wishlist.filter((el) => el.id !== place.id);

      this.#wishlist.set(newWishlist);
      this.#storage.setItem('wishlist', newWishlist);
    }
  }
}
