import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/search/search').then((m) => m.Search) },
  {
    path: 'place/:id',
    loadComponent: () => import('./pages/place-details/place-details').then((m) => m.PlaceDetails),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/wishlist/wishlist').then((m) => m.Wishlist),
  },
  { path: '**', redirectTo: '' },
];
