import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../interfaces/vehicles.interface';

export const selectVehicles = createFeatureSelector<AppState>('vehicles');
export const getMakers = createSelector(
  selectVehicles,
  (state) => state.filtered
);
export const getDetail = createSelector(
  selectVehicles,
  (state) => state.detail
);
