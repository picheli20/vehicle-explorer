import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Theme } from '../enums/theme.enum';
import { getTheme } from '../store/index';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private store = inject(Store);
  private document = inject(DOCUMENT);
  private STORAGE_KEY = 'theme';

  getDetaultTheme(): Theme {
    return globalThis.localStorage.getItem(this.STORAGE_KEY) as Theme ?? Theme.DARK;
  }

  setTheme() {
    const theme = this.store.selectSignal(getTheme)();
    globalThis.localStorage.setItem(this.STORAGE_KEY, theme);

    const html = this.document.documentElement;

    html.classList.remove(Theme.DARK, Theme.LIGHT);
    html.classList.add(theme);
  }
}
