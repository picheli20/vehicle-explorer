import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { setLoading } from '@vehicle-explorer/page';
import { Subject, firstValueFrom, of, throwError } from 'rxjs';
import { MakerDetail } from '../../interfaces/maker-detail.interface';
import { Maker } from '../../interfaces/maker.interface';
import { Response } from '../../interfaces/response.interface';
import { ApiService } from '../../services/api.service';
import { loadMakerDetails, loadMakers, saveMakers, setDetails } from '../actions/vehicles.actions';
import { VehicleEffects } from './vehicle.effects';

describe('VehicleEffects', () => {
  let actions$: Subject<any>;
  let effects: VehicleEffects;
  let apiService: Partial<ApiService>;
  let store: any;

  beforeEach(() => {
    actions$ = new Subject();

    apiService = {
      getMakers: jest.fn(),
      getDetails: jest.fn(),
    };

    store = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(of(null)),
    };

    TestBed.configureTestingModule({
      providers: [
        VehicleEffects,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: apiService },
        { provide: Store, useValue: store },
      ],
    });

    effects = TestBed.inject(VehicleEffects);
  });

  describe('loadMakers$', () => {
    it('should call API and dispatch saveMakers and setLoading', async () => {
      const makers: Response<Maker> = {
        Count: 1,
        Message: '',
        SearchCriteria: '',
        Results: [{ Make_ID: 1, Make_Name: 'Tesla' }],
      };

      (apiService.getMakers as jest.Mock).mockReturnValue(of(makers));

      const effectPromise = firstValueFrom(effects.loadMakers$);
      actions$.next(loadMakers());

      const result = await effectPromise;

      expect(result).toEqual(saveMakers(makers));
      expect(store.dispatch).toHaveBeenCalledWith(setLoading(true));
      expect(store.dispatch).toHaveBeenCalledWith(setLoading(false));
    });

    it('should handle API error and still dispatch setLoading(false)', async () => {
      (apiService.getMakers as jest.Mock).mockReturnValue(throwError(() => new Error('fail')));

      const effectPromise = firstValueFrom(effects.loadMakers$);
      actions$.next(loadMakers());

      await expect(effectPromise).rejects.toThrow('fail');

      expect(store.dispatch).toHaveBeenCalledWith(setLoading(true));
      expect(store.dispatch).toHaveBeenCalledWith(setLoading(false));
    });
  });

  describe('loadDetails$', () => {
    it('should call API and dispatch setDetails and setLoading', async () => {
      const detail: MakerDetail = {
        makeId: 1,
        types: [{ VehicleTypeId: 1, VehicleTypeName: 'SUV' }],
        models: [{ Model_ID: 1, Model_Name: 'Model X', Make_ID: 1, Make_Name: 'Tesla' }],
      };

      (apiService.getDetails as jest.Mock).mockReturnValue(of(detail));

      const effectPromise = firstValueFrom(effects.loadDetails$);
      actions$.next(loadMakerDetails(1));

      const result = await effectPromise;

      expect(result).toEqual(setDetails(detail.makeId, detail.types, detail.models));
      expect(store.dispatch).toHaveBeenCalledWith(setLoading(true));
      expect(store.dispatch).toHaveBeenCalledWith(setLoading(false));
    });

    it('should handle API error and still dispatch setLoading(false)', async () => {
      (apiService.getDetails as jest.Mock).mockReturnValue(throwError(() => new Error('fail')));

      const effectPromise = firstValueFrom(effects.loadDetails$);
      actions$.next(loadMakerDetails(1));

      await expect(effectPromise).rejects.toThrow('fail');
      expect(store.dispatch).toHaveBeenCalledWith(setLoading(true));
      expect(store.dispatch).toHaveBeenCalledWith(setLoading(false));
    });
  });
});
