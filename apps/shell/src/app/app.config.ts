import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { VehicleEffects, vehiclesReducer } from '@vehicle-explorer/data';
import { ENVIRONMENT_TOKEN, PageEffects, pageReducer } from '@vehicle-explorer/page';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom([
      StoreModule.forRoot({
        vehicles: vehiclesReducer,
        page: pageReducer,
      }),
      EffectsModule.forRoot([VehicleEffects, PageEffects]),
    ]),
    {
      provide: ENVIRONMENT_TOKEN,
      useValue: environment,
    }
  ],
};
