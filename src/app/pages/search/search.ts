import { Component, inject } from '@angular/core';
import { PlaceStore } from '../../store/place-store';
import { SearchBar } from '../../components/search-bar/search-bar';
import { PlaceList } from '../../components/place-list/place-list';

@Component({
  selector: 'app-search',
  imports: [SearchBar, PlaceList],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  #place = inject(PlaceStore);

  protected readonly places = this.#place.places;
  protected readonly fetching = this.#place.fetching;

  onSearchValueChange(query: string) {
    this.#place.changeQuery(query);
  }
}
