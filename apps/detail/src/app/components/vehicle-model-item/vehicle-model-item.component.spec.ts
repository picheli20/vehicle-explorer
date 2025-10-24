import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { VehicleModelItemComponent } from './vehicle-model-item.component';

describe('VehicleModelItemComponent', () => {
  let fixture: ComponentFixture<VehicleModelItemComponent>;
  let component: VehicleModelItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatChipsModule, VehicleModelItemComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleModelItemComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('label input()', () => {
    it('should set and get the label value correctly', () => {
      fixture.componentRef.setInput('label', 'Model X');
      expect(component.label()).toBe('Model X');
    });

    it('should reflect the label in the template', () => {
      fixture.componentRef.setInput('label', 'Cybertruck');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Cybertruck');
    });
  });
});
