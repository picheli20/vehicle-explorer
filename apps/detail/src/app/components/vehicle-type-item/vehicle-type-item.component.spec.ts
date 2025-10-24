import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { VehicleTypeItemComponent } from './vehicle-type-item.component';

describe('VehicleTypeItemComponent', () => {
  let fixture: ComponentFixture<VehicleTypeItemComponent>;
  let component: VehicleTypeItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatChipsModule, VehicleTypeItemComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleTypeItemComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('label input()', () => {
    it('should set and get the label value correctly', () => {
      fixture.componentRef.setInput('label', 'SUV');
      expect(component.label()).toBe('SUV');
    });

    it('should render the label in the template', () => {
      fixture.componentRef.setInput('label', 'Convertible');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Convertible');
    });
  });
});
