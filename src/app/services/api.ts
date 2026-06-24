import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { PlaceQueryParameters, PlaceResponse } from '../models/api';
import { Cache } from '../store/cache';
import { of, tap } from 'rxjs';
import { Photo, Place } from '../models/place';
import { environment } from '../../environments/environment';

@Service()
export class Api {
  #http = inject(HttpClient);
  #cache = inject(Cache);

  getPlaces(parameters: PlaceQueryParameters) {
    const cacheKey = this.#cache.getCacheKey('places', parameters);
    const cachedResponse = this.#cache.getRecord<PlaceResponse>(cacheKey);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return this.#http
      .post<PlaceResponse>(
        `${environment.placesUrl}/v1/places:searchText`,
        {
          textQuery: parameters.query,
          locationBias: {
            circle: {
              center: { latitude: parameters.latitude, longitude: parameters.longitude },
              radius: 5000.0,
            },
          },
        },
        {
          headers: {
            ['X-Goog-Api-Key']: environment.googleApiKey,
            ['X-Goog-FieldMask']:
              'places.id,places.displayName,places.formattedAddress,places.rating,places.photos,places.iconMaskBaseUri,places.iconBackgroundColor',
          },
        },
      )
      .pipe(
        tap((response) => {
          this.#cache.setRecord(cacheKey, response);
        }),
      );
  }

  getPlaceById(placeId: string) {
    const cacheKey = this.#cache.getCacheKey('place', placeId);
    const cachedResponse = this.#cache.getRecord<Place>(cacheKey);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return this.#http
      .get<Place>(`${environment.placesUrl}/v1/places/${placeId}`, {
        headers: {
          ['X-Goog-Api-Key']: environment.googleApiKey,
          ['X-Goog-FieldMask']:
            'id,displayName,formattedAddress,rating,photos,editorialSummary,generativeSummary,reviews,reviewSummary,iconMaskBaseUri,iconBackgroundColor',
        },
      })
      .pipe(
        tap((response) => {
          this.#cache.setRecord(cacheKey, response);
        }),
      );
  }
}
