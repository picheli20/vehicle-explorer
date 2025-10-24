import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { searchMakers } from '@vehicle-explorer/data';

@Component({
  selector: 'app-search',
  templateUrl: `./search.component.html`,
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
})
export class SearchComponent {
  private store = inject(Store);
  form = new FormGroup({
    search: new FormControl(''),
  });

  search() {
    const value = this.form.get('search')?.value;

    this.store.dispatch(searchMakers(value ?? ''));
  }
}
