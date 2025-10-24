import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Theme } from '../enums/theme.enum';
import { PageService } from './page.service';

describe('PageService', () => {
  let service: PageService;
  let storeMock: any;
  let documentMock: any;

  beforeEach(() => {
    storeMock = {
      selectSignal: jest.fn().mockReturnValue(() => Theme.DARK),
    };

    documentMock = {
      documentElement: {
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
        },
      },
    };

    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });

    TestBed.configureTestingModule({
      providers: [
        PageService,
        { provide: Store, useValue: storeMock },
        { provide: DOCUMENT, useValue: documentMock },
      ],
    });

    service = TestBed.inject(PageService);
  });

  describe('getDetaultTheme()', () => {
    it('should return stored theme if present', () => {
      (globalThis.localStorage.getItem as jest.Mock).mockReturnValue(Theme.LIGHT);

      const result = service.getDetaultTheme();

      expect(result).toBe(Theme.LIGHT);
      expect(globalThis.localStorage.getItem).toHaveBeenCalledWith('theme');
    });

    it('should return Theme.DARK if no theme is stored', () => {
      (globalThis.localStorage.getItem as jest.Mock).mockReturnValue(null);

      const result = service.getDetaultTheme();

      expect(result).toBe(Theme.DARK);
    });
  });

  describe('setTheme()', () => {
    it('should set theme in localStorage and update document classes', () => {
      service.setTheme();

      // Check store selectSignal called
      expect(storeMock.selectSignal).toHaveBeenCalled();

      // localStorage updated
      expect(globalThis.localStorage.setItem).toHaveBeenCalledWith('theme', Theme.DARK);

      // document classes updated
      expect(documentMock.documentElement.classList.remove).toHaveBeenCalledWith(Theme.DARK, Theme.LIGHT);
      expect(documentMock.documentElement.classList.add).toHaveBeenCalledWith(Theme.DARK);
    });
  });
});
