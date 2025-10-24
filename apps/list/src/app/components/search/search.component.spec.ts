import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { searchMakers } from '@vehicle-explorer/data';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let component: SearchComponent;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        SearchComponent, // standalone
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize the form with an empty "search" control', () => {
      expect(component.form.contains('search')).toBe(true);
      expect(component.form.get('search')?.value).toBe('');
    });
  });

  describe('search()', () => {
    it('should dispatch searchMakers with the entered search value', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.form.get('search')?.setValue('HONDA');

      component.search();

      expect(dispatchSpy).toHaveBeenCalledWith(searchMakers('HONDA'));
    });

    it('should dispatch searchMakers with an empty string when no value is entered', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.form.get('search')?.setValue('');

      component.search();

      expect(dispatchSpy).toHaveBeenCalledWith(searchMakers(''));
    });
  });
});
