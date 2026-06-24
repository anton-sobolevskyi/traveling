import { Component, effect, output } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MIN_SEARCH_QUERY_LENGTH } from '../../constants';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  readonly value = output<string>();
  protected readonly control = new FormControl('');

  #controlValue = toSignal(
    this.control.valueChanges.pipe(
      debounceTime(400),
      map((value) => ((value || '').length > MIN_SEARCH_QUERY_LENGTH ? value : '')),
      distinctUntilChanged(),
      takeUntilDestroyed(),
    ),
  );

  #changeRef = effect(() => {
    const value = this.#controlValue();

    this.value.emit(value || '');
  });
}
