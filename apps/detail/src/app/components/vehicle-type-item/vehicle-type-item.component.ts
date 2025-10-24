import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-vehicle-type-item',
  templateUrl: `./vehicle-type-item.component.html`,
  styleUrls: ['./vehicle-type-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ MatChipsModule ],
})
export class VehicleTypeItemComponent {
  label = input<string>();
}
