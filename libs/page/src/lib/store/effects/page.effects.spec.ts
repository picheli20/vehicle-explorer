import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject, firstValueFrom } from 'rxjs';
import { Theme } from '../../enums/theme.enum';
import { PageService } from '../../services/page.service';
import { appInit, setTheme } from '../actions/page.actions';
import { PageEffects } from './page.effects';

describe('PageEffects', () => {
  let actions$: Subject<any>;
  let effects: PageEffects;
  let pageService: any;

  beforeEach(() => {
    actions$ = new Subject();

    pageService = {
      setTheme: jest.fn(),
      getDetaultTheme: jest.fn().mockReturnValue(Theme.DARK), // return enum
    };

    TestBed.configureTestingModule({
      providers: [
        PageEffects,
        provideMockActions(() => actions$),
        { provide: PageService, useValue: pageService },
      ],
    });

    effects = TestBed.inject(PageEffects);
  });

  describe('setTheme$', () => {
    it('should call pageService.setTheme when setTheme action is dispatched', async () => {
      effects.setTheme$.subscribe(); // activate effect

      // Dispatch action
      actions$.next(setTheme(Theme.DARK));

      // Wait a tick to let tap run
      await new Promise(process.nextTick);

      expect(pageService.setTheme).toHaveBeenCalledWith();
      expect(pageService.setTheme).toHaveBeenCalledTimes(1);
    });
  });

  describe('loadTheme$', () => {
    it('should dispatch setTheme with Theme.DARK on appInit', async () => {
      const promise = firstValueFrom(effects.loadTheme$); // get first emitted action

      // Dispatch appInit
      actions$.next(appInit());

      const action = await promise;

      expect(action).toEqual(setTheme(Theme.DARK));
      expect(pageService.getDetaultTheme).toHaveBeenCalledTimes(1);
    });
  });
});
