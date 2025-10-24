import { Maker } from '../../interfaces/maker.interface';
import { Response } from '../../interfaces/response.interface';
import { VehicleModels } from '../../interfaces/vehicle-models.interface';
import { VehicleTypes } from '../../interfaces/vehicle-types.interface';
import { saveMakers, searchMakers, setDetails } from '../actions/vehicles.actions';
import { initialState, vehiclesReducer } from './vehicles.reducer';

describe('vehiclesReducer', () => {
  describe('saveMakers', () => {
    it('should save makers and update filtered list', () => {
      const makers: Response<Maker> = {
        Count: 1,
        Message: '',
        SearchCriteria: '',
        Results: [{ Make_ID: 1, Make_Name: 'Tesla' }],
      };

      const newState = vehiclesReducer(initialState, saveMakers(makers));

      expect(newState.makers).toBe(makers);
      expect(newState.filtered).toEqual(makers.Results);
    });
  });

  describe('searchMakers', () => {
    it('should filter makers by search term', () => {
      const stateWithMakers = {
        ...initialState,
        makers: {
          Results: [
            { Make_ID: 1, Make_Name: 'Tesla' },
            { Make_ID: 2, Make_Name: 'Ford' },
          ],
        } as Response<Maker>,
        filtered: [],
      };

      const newState = vehiclesReducer(stateWithMakers, searchMakers('tes'));

      expect(newState.searchTerm).toBe('tes');
      expect(newState.filtered).toEqual([{ Make_ID: 1, Make_Name: 'Tesla' }]);
    });

    it('should return empty array if no makers match', () => {
      const stateWithMakers = {
        ...initialState,
        makers: {
          Results: [
            { Make_ID: 1, Make_Name: 'Tesla' },
            { Make_ID: 2, Make_Name: 'Ford' },
          ],
        } as Response<Maker>,
        filtered: [],
      };

      const newState = vehiclesReducer(stateWithMakers, searchMakers('bmw'));

      expect(newState.filtered).toEqual([]);
    });
  });

  describe('setDetails', () => {
    it('should set the detail object in state', () => {
      const models: VehicleModels[] = [{ Model_ID: 1, Model_Name: 'Model X', Make_ID: 1, Make_Name: 'Tesla' }];
      const types: VehicleTypes[] = [{ VehicleTypeId: 1, VehicleTypeName: 'SUV' }];
      const makeId = 1;

      const newState = vehiclesReducer(initialState, setDetails(makeId, types, models));

      expect(newState.detail).toEqual({ makeId, models, types });
    });
  });
});
