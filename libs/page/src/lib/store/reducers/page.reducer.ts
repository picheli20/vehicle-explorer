import { createReducer, on } from '@ngrx/store';
import { Theme } from '../../enums/theme.enum';
import { setLoading, setTheme } from '../actions/page.actions';
import { AppState } from '../interfaces/page.interface';

export const initialState: AppState = {
  isLoading: false,
  theme: Theme.DARK,
};

export const pageReducer = createReducer(
  initialState,
  on(setLoading, (state, { isLoading }) => ({
    ...state,
    isLoading,
  })),
  on(setTheme, (state, { theme }) => ({
    ...state,
    theme,
  })),
);
