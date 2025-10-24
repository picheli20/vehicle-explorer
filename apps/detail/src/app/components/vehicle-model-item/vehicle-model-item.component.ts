import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-vehicle-model-item',
  templateUrl: `./vehicle-model-item.component.html`,
  styleUrls: ['./vehicle-model-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ MatChipsModule ],
})
export class VehicleModelItemComponent {
  label = input<string>();
}
