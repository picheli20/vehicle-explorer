import { createReducer, on } from '@ngrx/store';
import { saveMakers, searchMakers, setDetails } from '../actions/vehicles.actions';
import { AppState } from '../interfaces/vehicles.interface';

export const initialState: AppState = {
  searchTerm: '',
  filtered: [],
};

export const vehiclesReducer = createReducer(
  initialState,
  on(saveMakers, (state, { makers }) => ({
    ...state,
    makers,
    filtered: makers.Results,
  })),
  on(searchMakers, (state, { search }) => ({
    ...state,
    searchTerm: search,
    filtered: (state.makers?.Results ?? []).filter(maker =>
      maker.Make_Name.toLowerCase().includes(search.toLowerCase())
    ),
  })),
  on(setDetails, (state, { makeId, models, types }) => ({
    ...state,
    detail: { makeId, models, types },
  })),
);
