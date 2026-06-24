import { Place } from './place';

export type PlaceResponse = {
  places: Place[];
};

export type PlaceQueryParameters = {
  query: string;
  latitude: number;
  longitude: number;
  radius?: number;
};
