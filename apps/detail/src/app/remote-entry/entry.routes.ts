import { Route } from '@angular/router';
import { AppComponent } from '../routes/app.component';

export const remoteRoutes: Route[] = [{ path: ':id', component: AppComponent }];
