import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment, ENVIRONMENT_TOKEN } from '@vehicle-explorer/page';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
import { MakerDetail } from '../interfaces/maker-detail.interface';
import { Maker } from '../interfaces/maker.interface';
import { Response } from '../interfaces/response.interface';
import { VehicleModels } from '../interfaces/vehicle-models.interface';
import { VehicleTypes } from '../interfaces/vehicle-types.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private env: Environment = inject(ENVIRONMENT_TOKEN);
  private http = inject(HttpClient);

  private makersCache: Response<Maker> | null = null;
  private detailsCache = new Map<number | string, MakerDetail>();

  getMakers() {
    if (this.makersCache) {
      return of(this.makersCache);
    }

    return this.http.get<Response<Maker>>(`${this.env.apiUrl}/vehicles/getallmakes?format=json`).pipe(
      tap(response => this.makersCache = response),
    );
  }

  getVehicleTypes(makeId: number | string) {
    return this.http.get<Response<VehicleTypes>>(`${this.env.apiUrl}/vehicles/GetVehicleTypesForMakeId/${makeId}?format=json`);
  }

  getModels(makeId: number | string) {
    return this.http.get<Response<VehicleModels>>(`${this.env.apiUrl}/vehicles/GetModelsForMakeId/${makeId}?format=json`);
  }

  getMakerDetail(makeId: number | string) {
    return this.http.get<Response<VehicleModels>>(`${this.env.apiUrl}/vehicles/GetManufacturerDetails/${makeId}?format=json`);
  }

  getDetails(makeId: number | string): Observable<MakerDetail> {
    const cached = this.detailsCache.get(makeId);

    if (cached) {
      return of(cached);
    }

    const vehicleTypes = this.getVehicleTypes(makeId);
    const models = this.getModels(makeId);

    return combineLatest([vehicleTypes, models]).pipe(
      map(([types, models]) => ({ makeId, types: types.Results, models: models.Results })),
      tap(detail => this.detailsCache.set(makeId, detail)),
    );
  }
}
