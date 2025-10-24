import { AppState } from '../interfaces/vehicles.interface';
import { getDetail, getMakers } from './vehicles.selector';

describe('Vehicles Selectors', () => {
  const mockState: AppState = {
    filtered: [{ Make_ID: 1, Make_Name: 'Tesla' }],
    detail: {
      makeId: 1,
      types: [{
        VehicleTypeId: 11,
        VehicleTypeName: 'SUV'
      }],
      models: [{
        Make_ID: 1,
        Make_Name: 'Tesla',
        Model_ID: 12,
        Model_Name: 'Model X'
      }]
    },
    searchTerm: 'Search',
  };;

  describe('getMakers', () => {
    it('should select filtered makers from state', () => {
      const result = getMakers.projector(mockState);
      expect(result).toEqual(mockState.filtered);
    });
  });

  describe('getDetail', () => {
    it('should select detail from state', () => {
      const result = getDetail.projector(mockState);
      expect(result).toEqual(mockState.detail);
    });
  });
});
