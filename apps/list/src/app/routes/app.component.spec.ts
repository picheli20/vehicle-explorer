import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getMakers, loadMakers } from '@vehicle-explorer/data';
import { ListItemComponent } from '../components/list-item/list-item.component';
import { SearchComponent } from '../components/search/search.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore;
  const mockMakers = [{ id: 1, name: 'Tesla' }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatSlideToggleModule,
        ScrollingModule,
        ListItemComponent,
        SearchComponent,
        AppComponent,
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: getMakers, value: mockMakers }
          ]
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
  describe('Initialization', () => {

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should select makers$ from the store', (done) => {
      component.makers$.subscribe((makers) => {
        expect(makers).toEqual(mockMakers);
        done();
      });
    });
  });

  describe('ngOnInit()', () => {
    it('should dispatch loadMakers on init', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.ngOnInit();
      expect(dispatchSpy).toHaveBeenCalledWith(loadMakers());
    });
  });
});
