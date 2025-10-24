import { createAction } from '@ngrx/store';
import { Maker } from '../../interfaces/maker.interface';
import { Response } from '../../interfaces/response.interface';
import { VehicleModels } from '../../interfaces/vehicle-models.interface';
import { VehicleTypes } from '../../interfaces/vehicle-types.interface';

export const loadMakers = createAction('[Vehicles] loadMakers');
export const saveMakers = createAction('[Vehicles] saveMakers', (makers: Response<Maker>) => ({makers}));
export const searchMakers = createAction('[Vehicles] searchMakers', (search: string) => ({search}));
export const loadMakerDetails = createAction('[Vehicles] loadMakerDetails', (makerId: string | number) => ({makerId}));
export const setDetails = createAction('[Vehicles] setDetails', (  makeId: number | string, types: VehicleTypes[], models: VehicleModels[]) => ({makeId, types, models}));
