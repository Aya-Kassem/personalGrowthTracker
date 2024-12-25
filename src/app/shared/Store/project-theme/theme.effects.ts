import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { toggleTheme } from './theme.action';
import { isDarkMode } from './theme.reducer';

@Injectable()
export class ThemeEffects {
  _Actions$ = inject(Actions);
  _Store = inject(Store<{ themeToggler: typeof isDarkMode }>);

  constructor() {}
  toggleTheme$ = createEffect(
    () =>
      this._Actions$.pipe(
        ofType(toggleTheme),
        tap(() => {
          this._Store
            .select((state) => state.themeToggler)
            .subscribe((isDarkMode) => {
              document.body.classList.toggle('dark-mode', isDarkMode);
              document.body.classList.toggle('light-mode', !isDarkMode);
            });
        })
      ),
    { dispatch: false }
  );
}
