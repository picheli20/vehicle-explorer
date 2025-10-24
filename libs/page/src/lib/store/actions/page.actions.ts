import { createAction } from '@ngrx/store';
import { Theme } from '../../enums/theme.enum';

export const appInit = createAction('[Page] appInit');
export const setTheme = createAction('[Page] Set Theme', (theme: Theme) => ({ theme }));
export const setLoading = createAction('[Page] Loading', (isLoading: boolean) => ({ isLoading }));
