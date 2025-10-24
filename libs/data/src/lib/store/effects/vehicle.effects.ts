import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { setLoading } from '@vehicle-explorer/page';
import { finalize, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { loadMakerDetails, loadMakers, saveMakers, setDetails } from '../actions/vehicles.actions';
import { getMakers } from '../selectors/vehicles.selector';

@Injectable()
export class VehicleEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private apiService = inject(ApiService);

  /**
   * Ideally also the API would be caching this data to avoid
   * unnecessary network requests for the provider
   */
  loadMakers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMakers),
      withLatestFrom(this.store.select(getMakers)),
      tap(() => this.store.dispatch(setLoading(true))),
      switchMap(() =>
        this.apiService.getMakers().pipe(
          map(makers => saveMakers(makers)),
          finalize(() => this.store.dispatch(setLoading(false))),
        )
      )
    )
  );

  loadDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMakerDetails),
      tap(() => this.store.dispatch(setLoading(true))),
      switchMap(({ makerId }) => this.apiService.getDetails(makerId).pipe(
        finalize(() => this.store.dispatch(setLoading(false))),
      )),
      map(detail => setDetails(detail.makeId, detail.types, detail.models)),
    )
  );
}
