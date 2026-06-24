import { Component, inject } from '@angular/core';
import { PlaceStore } from '../../store/place-store';
import { PlaceList } from '../../components/place-list/place-list';

@Component({
  selector: 'app-wishlist',
  imports: [PlaceList],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {
  #place = inject(PlaceStore);

  wishlist = this.#place.wishlist;
}
