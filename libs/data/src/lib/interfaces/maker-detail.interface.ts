import { VehicleModels } from './vehicle-models.interface';
import { VehicleTypes } from './vehicle-types.interface';


export interface MakerDetail {
  makeId: number | string;
  types: VehicleTypes[];
  models: VehicleModels[];
}
