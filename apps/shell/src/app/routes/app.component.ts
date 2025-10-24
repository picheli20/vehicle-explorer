import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { appInit, getTheme, setTheme, Theme } from '@vehicle-explorer/page';
import { LoadingComponent } from '../components/loading/loading.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    LoadingComponent,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
})
export class App implements OnInit {
  darkThemeActive = new FormControl(true);
  private store = inject(Store);
  private theme$ = this.store.select(getTheme);

  ngOnInit(): void {
    this.store.dispatch(appInit());

    this.theme$.subscribe(theme => this.darkThemeActive.setValue(theme === Theme.DARK));

    this.darkThemeActive.valueChanges.subscribe(isDark => this.store.dispatch(setTheme(isDark ? Theme.DARK : Theme.LIGHT)));
  }
}
