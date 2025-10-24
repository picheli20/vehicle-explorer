import { MakerDetail } from '../../interfaces/maker-detail.interface';
import { Maker } from '../../interfaces/maker.interface';
import { Response } from '../../interfaces/response.interface';

export interface AppState {
  makers?: Response<Maker>,
  detail?: MakerDetail,
  searchTerm: string,
  filtered: Maker[],
}
