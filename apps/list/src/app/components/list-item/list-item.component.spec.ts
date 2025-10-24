import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Maker } from '@vehicle-explorer/data';
import { ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  let fixture: ComponentFixture<ListItemComponent>;
  let component: ListItemComponent;

  const mockMaker: Maker = {
    Make_ID: 1,
    Make_Name: 'HONDA'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        RouterModule.forRoot([]),
        ListItemComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should update the template when item input changes', () => {
      fixture.componentRef.setInput('item', mockMaker);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;

      // Assuming your template displays the maker name somewhere
      expect(compiled.textContent).toContain('HONDA');
    });
  });

});
