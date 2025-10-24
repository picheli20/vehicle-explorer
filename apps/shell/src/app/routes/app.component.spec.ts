import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { appInit, getTheme, setTheme, Theme } from '@vehicle-explorer/page';
import { of, Subject } from 'rxjs';
import { LoadingComponent } from '../components/loading/loading.component';
import { App } from './app.component';

describe('App (standalone)', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let storeMock: any;
  let themeSubject: Subject<Theme>;

  beforeEach(async () => {
    themeSubject = new Subject<Theme>();

    storeMock = {
      dispatch: jest.fn(),
      select: jest.fn((selector) => {
        if (selector === getTheme) return themeSubject.asObservable();
        return of(null);
      }),
      selectSignal: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        MatToolbarModule,
        MatButtonModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        LoadingComponent,
        App, // Standalone component
      ],
      providers: [
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('ngOnInit()', () => {
    it('should dispatch appInit action', () => {
      component.ngOnInit();
      expect(storeMock.dispatch).toHaveBeenCalledWith(appInit());
    });

    it('should dispatch setTheme when darkThemeActive value changes', () => {
      component.ngOnInit();

      // simulate toggle to LIGHT
      component.darkThemeActive.setValue(false);
      expect(storeMock.dispatch).toHaveBeenCalledWith(setTheme(Theme.LIGHT));

      // simulate toggle back to DARK
      component.darkThemeActive.setValue(true);
      expect(storeMock.dispatch).toHaveBeenCalledWith(setTheme(Theme.DARK));
    });

    it('should update darkThemeActive FormControl when store emits', () => {
      component.ngOnInit();

      const setValueSpy = jest.spyOn(component.darkThemeActive, 'setValue');

      // Emit DARK → FormControl should be true
      themeSubject.next(Theme.DARK);
      expect(setValueSpy).toHaveBeenCalledWith(true);

      // Emit LIGHT → FormControl should be false
      themeSubject.next(Theme.LIGHT);
      expect(setValueSpy).toHaveBeenCalledWith(false);
    });
  });
});
