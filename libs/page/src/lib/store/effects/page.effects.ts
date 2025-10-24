import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { PageService } from '../../services/page.service';
import { appInit, setTheme } from '../actions/page.actions';

@Injectable()
export class PageEffects {
  private actions$ = inject(Actions);
  private pageService = inject(PageService);

  setTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setTheme),
      tap(() => this.pageService.setTheme()),
    ), { dispatch: false }
  );

  loadTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appInit),
      map(() => this.pageService.getDetaultTheme()),
      map(theme => setTheme(theme)),
    )
  )
}
