import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getDetail, loadMakerDetails } from '@vehicle-explorer/data';
import { of } from 'rxjs';
import { VehicleModelItemComponent } from '../components/vehicle-model-item/vehicle-model-item.component';
import { VehicleTypeItemComponent } from '../components/vehicle-type-item/vehicle-type-item.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const mockDetails = { id: '1', name: 'Tesla' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        VehicleModelItemComponent,
        VehicleTypeItemComponent,
        AppComponent, // standalone
      ],
      providers: [
        provideMockStore({
          selectors: [{ selector: getDetail, value: mockDetails }],
        }),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(new Map([['id', '1']])) },
        },
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize details signal from store', () => {
      expect(component.details()).toEqual(mockDetails);
    });
  });

  describe('ngOnInit()', () => {
    it('should dispatch loadMakerDetails when id param exists', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      component.ngOnInit();

      expect(dispatchSpy).toHaveBeenCalledWith(loadMakerDetails('1'));
    });

    it('should navigate to "/" when id param is missing', () => {
      // override ActivatedRoute for this test
      (component as any).route = { paramMap: of(new Map()) };
      const navigateSpy = jest.spyOn(router, 'navigate');

      component.ngOnInit();

      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });
  });
});
