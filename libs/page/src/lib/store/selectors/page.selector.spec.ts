import { Theme } from '../../enums/theme.enum';
import { AppState } from '../interfaces/page.interface';
import { getTheme, isLoading } from './page.selector';

describe('Page Selectors', () => {
  const mockState: { page: AppState } = {
    page: {
      isLoading: true,
      theme: Theme.DARK,
    },
  };

  describe('isLoading', () => {
    it('should select isLoading from state', () => {
      const result = isLoading(mockState);
      expect(result).toBe(true);
    });

    it('should return false if isLoading is false', () => {
      const state: { page: AppState } = {
        page: { isLoading: false, theme: Theme.LIGHT },
      };
      expect(isLoading(state)).toBe(false);
    });
  });

  describe('getTheme', () => {
    it('should select theme from state', () => {
      const result = getTheme(mockState);
      expect(result).toBe(Theme.DARK);
    });

    it('should return light if theme is light', () => {
      const state: { page: AppState } = {
        page: { isLoading: false, theme: Theme.LIGHT },
      };
      expect(getTheme(state)).toBe(Theme.LIGHT);
    });
  });
});
