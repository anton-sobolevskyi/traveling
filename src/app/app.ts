import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Api } from './services/api';
import { PlaceStore } from './store/place-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [Api],
  host: {
    class: 'flex flex-col h-full',
  },
})
export class App implements OnInit {
  #placeStore = inject(PlaceStore);

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.#placeStore.changeLocation(position.coords);
      },
      (error) => {
        console.error(error.message);
      },
    );
  }
}
