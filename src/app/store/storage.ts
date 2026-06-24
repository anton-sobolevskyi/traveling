import { Service } from '@angular/core';

@Service()
export class Storage {
  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    return item ? (JSON.parse(item) as T) : null;
  }

  setItem<T>(key: string, value: T): void {
    const encodedValue = JSON.stringify(value);

    localStorage.setItem(key, encodedValue);
  }
}
