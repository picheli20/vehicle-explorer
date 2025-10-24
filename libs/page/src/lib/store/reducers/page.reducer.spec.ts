import { Theme } from '../../enums/theme.enum';
import { setLoading, setTheme } from '../actions/page.actions';
import { initialState, pageReducer } from './page.reducer';

describe('pageReducer', () => {
  describe('setLoading', () => {
    it('should set isLoading to true', () => {
      const action = setLoading(true);
      const state = pageReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.theme).toBe(initialState.theme);
    });

    it('should set isLoading to false', () => {
      const action = setLoading(false);
      const state = pageReducer({ ...initialState, isLoading: true }, action);

      expect(state.isLoading).toBe(false);
      expect(state.theme).toBe(initialState.theme);
    });
  });

  describe('setTheme', () => {
    it('should set theme to LIGHT', () => {
      const action = setTheme(Theme.LIGHT);
      const state = pageReducer(initialState, action);

      expect(state.theme).toBe(Theme.LIGHT);
      expect(state.isLoading).toBe(initialState.isLoading);
    });

    it('should set theme to DARK', () => {
      const action = setTheme(Theme.DARK);
      const state = pageReducer({ ...initialState, theme: Theme.LIGHT }, action);

      expect(state.theme).toBe(Theme.DARK);
      expect(state.isLoading).toBe(initialState.isLoading);
    });
  });
});
