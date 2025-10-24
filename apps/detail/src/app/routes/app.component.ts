import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getDetail, loadMakerDetails } from '@vehicle-explorer/data';
import { VehicleModelItemComponent } from '../components/vehicle-model-item/vehicle-model-item.component';
import { VehicleTypeItemComponent } from '../components/vehicle-type-item/vehicle-type-item.component';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    VehicleTypeItemComponent,
    VehicleModelItemComponent,
  ],
})
export class AppComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  details = this.store.selectSignal(getDetail);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (!id) {
          // TODO: move to be a route guard
          this.router.navigate(['/']);
        return;
      }

      this.store.dispatch(loadMakerDetails(id));
    });
  }
}
