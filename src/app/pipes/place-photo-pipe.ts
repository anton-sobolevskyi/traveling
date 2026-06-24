import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../models/place';

@Pipe({
  name: 'placePhoto',
})
export class PlacePhotoPipe implements PipeTransform {
  transform(value: Photo, ...args: number[]): string {
    const [width, height] = args;

    return `https://places.googleapis.com/v1/${value.name}/media?key=${'AIzaSyD-4eBdIyUGLVzcxGVZkk0GOgVInjAqNBA'}&maxHeightPx=${height ?? value.heightPx}&maxWidthPx=${width ?? value.widthPx}`;
  }
}
