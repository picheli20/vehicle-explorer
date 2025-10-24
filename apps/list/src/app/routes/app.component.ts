import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { getMakers, loadMakers } from '@vehicle-explorer/data';
import { ListItemComponent } from '../components/list-item/list-item.component';
import { SearchComponent } from '../components/search/search.component';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    ListItemComponent,
    ScrollingModule,
    SearchComponent,
  ],
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  makers$ = this.store.select(getMakers);

  ngOnInit(): void {
    this.store.dispatch(loadMakers());
  }
}
